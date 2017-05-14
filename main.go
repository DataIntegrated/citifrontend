// This is a http based application
// uses [echo](github.com/labstack/echo) web framework
// creator: Alloys Mila <mila.alloys@gmail.com>

package main

import (
	"github.com/DataIntegrated/citifrontend/backend"
	"github.com/DataIntegrated/citifrontend/storage"
	"github.com/DataIntegrated/citifrontend/util"
	"github.com/labstack/echo"
)

func main() {
	// open the db
	db, _ := storage.CurrentStore()
	defer db.Close()

	// get the logger
	log := util.GetLogger()
	defer log.Logger.Sync()

	// echo
	e := echo.New()

	e.POST("/backend/accounts/authorise", backend.AuthoriseHandler)
	e.POST("/backend/accounts/newaccount", backend.NewUserHandler)

	// static SPA stuff
	e.Static("/static", "websrc/dist")
	e.File("/*", "websrc/dist/index.html")

	// start the server
	e.Logger.Fatal(e.Start(":3000"))
}
