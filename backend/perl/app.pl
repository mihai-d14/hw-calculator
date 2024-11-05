# app.pl
use strict;
use warnings;
use Mojolicious::Lite -signatures;
use JSON::Parse 'parse_json';
use JSON::Create 'create_json';

# Enable CORS
app->hook(before_dispatch => sub ($c) {
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
    $c->res->headers->header('Access-Control-Allow-Methods' => 'POST, OPTIONS');
    $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
});

# Handle OPTIONS requests for CORS
options '/calculate' => sub ($c) {
    $c->rendered(204);
};

# Calculate Hardy-Weinberg equilibrium
post '/calculate' => sub ($c) {
    my $json = $c->req->body;
    my $data = parse_json($json);
    my $p = $data->{frequency};
    
    # Validate input
    if (!defined $p || $p < 0 || $p > 1) {
        $c->render(json => {
            error => 'Frequency must be between 0 and 1'
        }, status => 400);
        return;
    }
    
    # Calculate frequencies
    my $q = 1 - $p;
    my $result = {
        aa => $p * $p,
        aq => 2 * $p * $q,
        qq => $q * $q
    };
    
    $c->render(json => $result);
};

app->start('daemon', '-l', 'http://*:3007');