package storage

import (
	"testing"

	"github.com/DataIntegrated/citifrontend/util"
)

func TestMerchants(t *testing.T) {
	var f Fetch
	m := f.Merchants()
	util.DumpInterface(m)
}
