var additional_rows = {}

function registerAdditional(host,data){
    additional_rows[host] = data
}

function getAdditional(host){
    return additional_rows[host]
}

function removeAdditional(host){

    delete additional_rows[host]
}

function purgeAdditional(){
    additional_rows = {}
}
