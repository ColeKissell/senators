const { send, json } = require('micro')
const { router, get } = require('microrouter')
const Senators = require('./data/senators.json')

const senators = (req, res) => send( res, 200, Senators)
const notfound = (req, res) => send( res, 404, 'Not found route')

const mapping = (arr) => {
    let mappedSenators = arr.map((arr) =>
     ({firstName: arr.person.firstname, 
       lastName: arr.person.lastname, 
       state: arr.state,
       rank: arr.senator_rank,
       party: arr.party,
       gender: arr.person.gender}))
   return mappedSenators 
 }


const democrats= async(req, res) => {
    const result = await mapping(Senators)
    const dem = await result.filter((result) => result.party == "Democrat"||result.party == "democrat");
    send(res, 200, dem)
}
const republicans=async (req,res)=>{
    const rep = await Senators.filter((Senator)=>Senator.party ==="Republican"|| Senators.party == "republician" );
    const mapped =  mapping(rep)
    send(res, 200, mapped)
} 

 const state = async(req,res)=>{
    const s =  await Senators.filter((Senator) => Senator.state === req.params.state)
    const result =  mapping(s)
    send(res,200,result)
} 
module.exports = router(
  get('/senators', senators),
  get('/', senators),
  get('/democrats', democrats),
  get('/republicans', republicans),
  get('/:state', state),
  get('/*', notfound)
)