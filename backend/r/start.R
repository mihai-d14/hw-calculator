# start.R
library(plumber)

pr <- plumb("plumber.R")
pr$run(host="0.0.0.0", port=3008)