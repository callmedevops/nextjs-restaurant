const {USERNAME,PASSWORD,HOSTNAME,DATABASENAME} = process.env;
export const connectionStr = "mongodb://"+USERNAME+":"+PASSWORD+"@"+HOSTNAME+":27017/"+DATABASENAME+"?authSource=admin";