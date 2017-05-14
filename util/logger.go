package util

import (
	"sync"

	"go.uber.org/zap"
)

// Logging contains zap logger
type Logging struct {
	Logger *zap.Logger
	Sugar  *zap.SugaredLogger
}

var once sync.Once // for the singleton
var log Logging
var logger *zap.Logger

// GetLogger returns a singleton instace for logging
func GetLogger() *Logging {
	once.Do(func() {
		logger, _ := zap.NewProduction()
		log.Logger = logger
		log.Sugar = logger.Sugar()
	})
	return &log
}
