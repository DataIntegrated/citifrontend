package backend

import (
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"sync"

	"github.com/DataIntegrated/citifrontend/util"
)

// GenerateRandomBytes generates secure random bytes
// returns an error if something fails
func GenerateRandomBytes(n int64) ([]byte, error) {
	m := make([]byte, n)
	_, err := rand.Read(m)
	if err != nil {
		return nil, err
	}
	return m, nil
}

// EmailPasswordBlock holds a salt
// and the hashed password
type EmailPasswordBlock struct {
	Email    []byte
	Password []byte
	Salt     []byte
	once     sync.Once
}

// Init initializes an EmailPasswordBlock
// takes and Email, Password Combo, and handlers hashing
func (b *EmailPasswordBlock) Init(a *Auth) (err error) {
	sugar := util.GetLogger().Sugar

	b.Email = []byte(a.Email)
	b.Password = []byte(a.Password)
	b.Salt, _ = GenerateRandomBytes(32)
	sugar.Infow("Created new salt", "salt", hex.EncodeToString(b.Salt))

	err = b.Hash()
	if err != nil {
		return err
	}
	return
}

// Hash takes in a string, probably user provided password
// and returns a hashed version
func (b *EmailPasswordBlock) Hash() (err error) {
	sugar := util.GetLogger().Sugar
	if b.Salt == nil {
		sugar.Panicw("called EmailPasswordBlock.Hash without a salt") // this should never have to happen
	}
	sugar.Infof("hashing with salt %s", hex.EncodeToString(b.Salt))
	if err != nil {
		return err
	}

	// every instance should take care to just Hash once
	b.once.Do(func() {
		err = b.hashPassword()
	})

	if err != nil {
		return err
	}
	return nil
}

// hashPassword takes in a user provided password
// and returns a hashed version
// operation is indepotent
func (b *EmailPasswordBlock) hashPassword() (err error) {
	// sha sum the password to get consistent lengths
	sha2 := sha256.New()
	sha2.Write(b.Password)

	sha := sha2.Sum(nil)

	// hmac the password with the salt
	mac := hmac.New(sha256.New, b.Salt)
	mac.Write(sha)
	sum := mac.Sum(nil)

	// replace the password with hashed
	b.Password = sum
	return
}
