package storage

import (
	"github.com/mofax/req"
	"github.com/tidwall/gjson"
)

// Fetch pulls things from the tax server
type Fetch struct{}

// Merchants gets the list of merchants
func (f Fetch) Merchants() []*Merchant {
	url := "https://revenue.eu-gb.mybluemix.net/api/merchant/list"
	r, _ := req.Get(url)
	b := r.Bytes()
	result := gjson.Parse(string(b))
	values := result.Array()
	arr := make([]*Merchant, len(values))
	for i, v := range values {
		var a Merchant
		gjson.Unmarshal([]byte(v.Raw), &a)
		arr[i] = &a
	}
	return arr
}
