package storage

import (
	"github.com/DataIntegrated/citifrontend/util"
	"github.com/jinzhu/gorm"

	// using postgres wrapper for gorm
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Merchant type holds merchant data
type Merchant struct {
	ID           string `gorm:"id"           json:"id"`
	Pin          string `gorm:"pin"          json:"pin"`
	Vat          string `gorm:"vat"          json:"vat"`
	Name         string `gorm:"name"         json:"name"`
	Location     string `gorm:"location"     json:"location"`
	Categorytype string `gorm:"categorytype" json:"categorytype"`
	Username     string `gorm:"username"     json:"username"`
	Password     string `gorm:"password"     json:"password"`
	Datecreated  string `gorm:"datecreated"  json:"datecreated"`
}

// TaxDevice type holds tax device data
type TaxDevice struct {
	ID          string `gorm:"id"          json:"id"`
	Deviceid    string `gorm:"deviceid"    json:"deviceid"`
	Merchantpin string `gorm:"merchantpin" json:"merchantpin"`
	Devicetype  string `gorm:"devicetype"  json:"devicetype"`
}

// Connect connects to postgres
func Connect() (*gorm.DB, error) {
	db, err := gorm.Open("postgres", "postgresql://root@localhost:26257/cititax?sslmode=disable")
	if err != nil {
		return nil, err
	}
	// defer db.Close()
	return db, nil
}

// UpdateData fetches data from upstream and updates to db
func UpdateData() {
	var f Fetch
	db, err := Connect()
	defer db.Close()

	if err != nil {
		util.DumpInterface(err.Error())
		return
	}

	// merchants
	merchants := f.Merchants()
	for _, v := range merchants {
		util.DumpInterface(v)
		if err = db.Save(v).Error; err != nil {
			util.DumpInterface(err.Error())
		}
	}
}
