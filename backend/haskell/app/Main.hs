{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where

import Web.Scotty
import Data.Aeson (FromJSON, ToJSON)
import GHC.Generics
import Network.Wai.Middleware.Cors
import Network.HTTP.Types.Status
import qualified Data.Text.Lazy as TL

data FrequencyRequest = FrequencyRequest 
  { frequency :: Double
  } deriving (Show, Generic)

data FrequencyResponse = FrequencyResponse 
  { aa :: Double
  , aq :: Double
  , qq :: Double
  } deriving (Show, Generic)

instance FromJSON FrequencyRequest
instance ToJSON FrequencyResponse

calculateHW :: Double -> FrequencyResponse
calculateHW p = 
  let q = 1 - p
      aaFreq = p * p
      aqFreq = 2 * p * q
      qqFreq = q * q
  in FrequencyResponse aaFreq aqFreq qqFreq

main :: IO ()
main = do
  putStrLn "Starting Haskell server on port 3001..."
  scotty 3001 $ do
    middleware simpleCors
    
    post "/calculate" $ do
      request <- jsonData :: ActionM FrequencyRequest
      let result = calculateHW (frequency request)
      json result