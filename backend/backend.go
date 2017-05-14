package backend

import (
	"encoding/hex"

	"github.com/DataIntegrated/citifrontend/storage"
	"github.com/DataIntegrated/citifrontend/util"
	"github.com/labstack/echo"
)

// Auth defines container for email and password
type Auth struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (u *Auth) isNill() bool {
	return (u.Email == "" || u.Password == "")
}

// NewUserHandler provides an endpoint to create new users
func NewUserHandler(c echo.Context) error {
	sugar := util.GetLogger().Sugar
	u := new(Auth)
	db, _ := storage.CurrentStore()

	if err := c.Bind(u); err != nil {
		return err
	}
	if u.isNill() {
		return echo.NewHTTPError(400, "Email and Password are expected!")
	}
	b := new(EmailPasswordBlock)
	b.Init(u)

	user := new(storage.User)
	r, err := storage.RandomID()
	if err != nil {
		return err
	}
	user.ID = r
	user.Email = string(b.Email)
	user.Password = hex.EncodeToString(b.Password)
	user.PasswordSalt = hex.EncodeToString(b.Salt)

	err = db.DB.Save(user)
	if err != nil {
		return echo.NewHTTPError(400, err.Error())
	}

	sugar.Infow("created a new user", "ID", user.ID, "Password", user.Password)
	return nil
}

// AuthoriseHandler provides an endpoint to login users
func AuthoriseHandler(c echo.Context) error {
	sugar := util.GetLogger().Sugar
	// return c.String(http.StatusOK, "Hello, World!")
	db, _ := storage.CurrentStore()
	// read the request body
	u := new(Auth)
	if err := c.Bind(u); err != nil {
		sugar.Error(err)
		return err
	}
	if u.isNill() {
		return echo.NewHTTPError(400, "Email and Password are required!")
	}
	var user storage.User
	err := db.DB.One("Email", u.Email, &user)

	if err != nil {
		if err == storage.ErrNotFound {
			return echo.NewHTTPError(401, "Login failed")
		}
		sugar.Error(err)
		return err
	}

	uDB := new(EmailPasswordBlock)
	uDB.Email = []byte(u.Email)
	uDB.Password = []byte(u.Password)
	uDB.Salt, _ = hex.DecodeString(user.PasswordSalt)

	uDB.Hash()
	if user.Password == hex.EncodeToString(uDB.Password) {
		sugar.Infow("successful login", "user", user.ID)
		return nil
	}
	sugar.Infof("failed password expected %s got %s", user.Password, hex.EncodeToString(uDB.Password))
	return echo.NewHTTPError(401, "Login failed")
}
