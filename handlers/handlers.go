package handlers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	connection "github.com/Sysnomid/paste/backend/connection"
	models "github.com/Sysnomid/paste/backend/models"
	"github.com/bwmarrin/snowflake"
	"github.com/labstack/echo/v4"
)

// CreatePaste ... Insert into Postgres with our Request Body
func CreatePaste(c echo.Context) (err error) {
	u := new(models.PasteReqBody)

	// Fail on validation errors
	if err = c.Bind(u); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	} else if err = c.Validate(u); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	if err != nil {
		log.Fatal(err)
		return
	}

	// Use snowflake for unique IDs and return id in our response body
	node, err := snowflake.NewNode(1)
	if err != nil {
		return c.String(http.StatusInternalServerError, err.Error())
	}
	var id int
	err = connection.Conn.QueryRow(context.Background(), "INSERT INTO pastes (id, title, text, expires_at, language) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
		node.Generate(), u.Title, u.Text, u.ExpiresAt, u.Language).Scan(&id)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		return c.String(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, id)
}

// GetPaste ... Get a paste where id equals req query params and is not expired
func GetPaste(c echo.Context) (err error) {
	var pr = new(models.PasteResBody)

	err = connection.Conn.QueryRow(
		context.Background(), "SELECT id, text, title, language, name, created_at FROM vw_pastes WHERE id = $1 and is_valid =  true;", c.Param("id")).
		Scan(&pr.ID, &pr.Text, &pr.Title, &pr.Language, &pr.LanguageDisplayName, &pr.CreatedAt)

	if err != nil {
		log.Println(err)
		return c.JSON(http.StatusNotFound, "Paste Not Found")
	}

	return c.JSONPretty(http.StatusOK, pr, " ")
}

// GetLanguages ... Get all of the supported languages
func GetLanguages(c echo.Context) (err error) {
	rows, err := connection.Conn.Query(context.Background(), "SELECT * FROM languages")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var rowSlice []models.LanguageRow
	for rows.Next() {
		var r models.LanguageRow
		err := rows.Scan(&r.Language, &r.Name)
		if err != nil {
			log.Fatal(err)
		}
		rowSlice = append(rowSlice, r)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
	return c.JSONPretty(http.StatusOK, rowSlice, "  ")
}

// DeletedExpired ... Infinite loop goroutine that auto deletes expired pastes
func DeleteExpired() {
	for {
		deletedRows, err := connection.Conn.Exec(context.Background(), "DELETE FROM pastes WHERE id IN (SELECT id FROM vw_pastes WHERE is_valid = false);")
		if err != nil {
			log.Fatal(err)
		}

		log.Println(deletedRows)
		time.Sleep(24 * time.Hour)
	}
}
