package middlewares

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

func formatResponse() fiber.Handler {
	return func(c *fiber.Ctx) error {
		// Proceed with the request
		err := c.Next()

		// Extracting information
		apiPath := c.Path()
		statusCode := c.Response().StatusCode()

		var responseBody interface{}
		contentType := string(c.Response().Header.ContentType())
		if contentType == "application/json" {
			if err := json.Unmarshal(c.Response().Body(), &responseBody); err != nil {
				return err
			}
		} else if contentType == "text/plain; charset=utf-8" {
			responseBody = (string(c.Response().Body()))
		} else {
			return nil
		}
		var errMsg *string
		if err != nil {
			errMsgStr := err.Error()
			errMsg = &errMsgStr
			if statusCode == fiber.StatusOK {
				statusCode = fiber.StatusInternalServerError
			}
		}
		// Formatting the response
		response := struct {
			API    string      `json:"api"`
			Status int         `json:"status"`
			Data   interface{} `json:"data"`
			Err    *string     `json:"err"`
		}{
			API:    apiPath,
			Status: statusCode,
			Data:   responseBody,
			Err:    errMsg,
		}
		return c.JSON(response)
	}
}
