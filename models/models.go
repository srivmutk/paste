package models

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"gopkg.in/guregu/null.v3"
)

// PasteReqBody ... Model for the HTTP POST Request Body for Creating a Paste
type PasteReqBody struct {
	Title     string      `json:"title" validate:"required"`
	Text      string      `json:"text" validate:"required"`
	ExpiresAt null.String `json:"expires_at,omitempty" validate:"omitempty"`
	Language  string      `json:"language" validate:"required"`
}

// PasteResBody ... Model for Paste HTTP response body when fetching a Paste
type PasteResBody struct {
	ID                  int
	Text                string
	Title               string
	CreatedAt           null.Time
	Language            string
	LanguageDisplayName string
}

// LanguageRow ... Model for Language HTTP response
type LanguageRow struct {
	Language string
	Name     string
}

// CustomValidator ... Validate the paste with validator v10
type CustomValidator struct {
	validator *validator.Validate
}

// Validate ... function using CustomValidator
func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return nil
}

// MainValidator .. CustomValidator Function
var MainValidator = &CustomValidator{validator: validator.New()}
