package storage

import (
	"sync"

	"github.com/asdine/storm"
)

var (
	// ErrNotFound when the record wasn't found
	ErrNotFound = storm.ErrNotFound
)

// Storage provides an interface for the persistence layer
type Storage struct {
	once sync.Once
	DB   *storm.DB
}

// Open opens a BoltDb (via storm)
// ready for read and write
func (d *Storage) Open() (err error) {
	d.once.Do(func() { // open the database as a singleton
		d.DB, err = storm.Open("mobitill-accounts.db")
	})
	if err != nil {
		panic(err.Error()) // the database MUST open; panic if it doesn't
	}
	return
}

// Close closes the database
func (d *Storage) Close() error {
	return d.DB.Close()
}

// singleton instance
var store *Storage
var oneStore sync.Once

// CurrentStore returns an instance of the store
// currently in use
func CurrentStore() (*Storage, error) {
	oneStore.Do(func() {
		store = new(Storage)
		store.Open()
	})
	return store, nil
}
