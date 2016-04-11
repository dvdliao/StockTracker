require( 'dotenv' ).load();
var cassandra = require( 'cassandra-driver' );
var async = require( 'async' );
var assert = require( 'assert' );

const authProvider = new cassandra.auth.PlainTextAuthProvider( process.env.CASSANDRA_USER_NAME, process.env.CASSANDRA_PASSWORD );
const ins_query = 'INSERT INTO tickers (t_name, t_company_name, t_market) VALUES (?, ?, ?)';

// Connect to the cluster
const client = new cassandra.Client( { contactPoints: [ process.env.CASSANDRA_SERVER_IP ], keyspace: process.env.CASSANDRA_KEYSPACE, authProvider: authProvider } );

client.connect(function (err) {
    console.log(err)
});

client.execute( ins_query, [ 'AAPL', 'Apple Inc', 1 ], { prepare: true }, function ( err, res ) {
  //Inserted in the cluster
  console.log( err, res );
});

client.execute( "SELECT * FROM tickers", { prepare: true }, function ( err, result ) {
    if (!err ) {
        if( result.rows.length > 0 ) {
            var stock = result.rows[ 0 ];
            console.log( "ticker = %s, company = %s", stock.t_name, stock.t_company_name );
        }
        else {
            console.log( "No results" );
        }
    }

    console.log( err, result );
});

console.log('done');
