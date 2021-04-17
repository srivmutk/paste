package connection

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/joho/godotenv"
)

// Conn .. pgxpool DB - Global Var
var Conn *pgxpool.Pool

// Init - Pgx DB connection
func Init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	Conn, err = pgxpool.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
}

// Create ... Get our queries and statements to create all of our necessary tables
func Create() {
	for {
		sqlMain, err := ioutil.ReadFile("create.sql")
		if err != nil {
			log.Fatal(err)
		}

		createSchema, err := Conn.Exec(context.Background(), string(sqlMain))
		if err != nil {
			log.Fatal(err)
		}

		log.Println(createSchema)

		time.Sleep(12 * time.Hour)
	}
}
