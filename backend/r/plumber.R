library(plumber)
library(jsonlite)

#* @apiTitle Hardy-Weinberg Calculator API
#* @apiDescription Calculate Hardy-Weinberg equilibrium frequencies

#* Calculate Hardy-Weinberg equilibrium frequencies
#* @param frequency The frequency of allele p
#* @post /calculate
function(frequency) {
    # Convert input to numeric
    p <- as.numeric(frequency)
    
    # Validate input
    if (is.na(p) || p < 0 || p > 1) {
        stop("Frequency must be between 0 and 1")
    }
    
    # Calculate frequencies
    q <- 1 - p
    aa <- p * p
    aq <- 2 * p * q
    qq <- q * q
    
    # Return results as single values, not vectors
    list(
        aa = as.numeric(aa)[1],
        aq = as.numeric(aq)[1],
        qq = as.numeric(qq)[1]
    )
}