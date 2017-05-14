package util

import (
	"fmt"
)

// DumpInterface dumps an variable type to stdout
func DumpInterface(v interface{}) {
	fmt.Printf("%#v\n", v)
}
