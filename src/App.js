import React,{Component} from 'react';
// import logo from './logo.svg';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Venue from './Venue';
import './App.css';

var clientId = 'GGTLFHS2U11W3AOQDX415MZZARYPCIXBEISKQYSWZHA4IOER';
var clientSecret = 'WZ413VNYIT2RT5YBDWSFPYCMVAZYTIOWAUG3OWBOO1DWRW1I';
var key = '?client_id='+clientId+'&client_secret='+clientSecret+'&v=20190801';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      venues:[
        //  {
        //   id: "4bc992e7b6c49c7401a28e91", 
        //   name: "Ken Yakitori", 
        //   address: ['3 City Road','Newton','Auckland'], 
        //   category: "Japanese"
        // },
        // {
        //   id: "4b4d4133f964a52070cf26e3", 
        //   name: "Real Groovy", 
        //   address: ['3 City Road','Newton','Auckland'], 
        //   category: "Record Shop"
        // },
        // {
        //   id: "4b53a56bf964a52013a627e3", 
        //   name: "Revel! Cafe", 
        //   address: ['3 City Road','Newton','Auckland'], 
        //   category: "Café"
        // }
      ],
      isModalOpen:false,
      watchedVenue:null,
    }
  }
  
 loadVenues =() =>
  {
      var latlng = '-36.857044,174.764406';
      var venuesURL = 'https://api.foursquare.com/v2/venues/explore'+key+'&ll='+latlng;
      
      fetch(venuesURL)
          .then((res)=>{
              return res.json()
          })
          .then((data)=>{
              return data.response.groups[0].items
          })
          .then((data)=>{
              return data.map(function(item){
                  //console.log(item);
                  var venue = {
                      id:item.venue.id,
                      name:item.venue.name,
                      address:item.venue.location.formattedAddress,
                      category:item.venue.categories[0].shortName,
                  };
                  return venue;
              });
              
          })
          .then((data)=>{ 
          //console.log(data);
            this.setState({venues:data});
          })
    
  }

   //===***GET DETAILS OF 1 VENUE***====
 loadVenue = (venueId) =>
{
    this.setState({watchedVenue:null});
    var venuesURL = 'https://api.foursquare.com/v2/venues/'+venueId+key;
    //console.log(venuesURL);
    fetch(venuesURL)
   .then((res)=>{
       return res.json()
   })
   .then((data)=>{
       //console.log(data);
       var item = data.response.venue;
       //console.log(item);
       var venue = {
        //    id:item.id,
           name:item.name,
           description:item.description,
           categorie:item.categories[0].shortName,
           address:item.location.formattedAddress,
           photo:item.bestPhoto.prefix+'300x300'+item.bestPhoto.suffix,
       }
       //console.log(venue);
       this.setState({watchedVenue:venue});
   })
}

// ======**** for call function loadVenues for all data ***======
// componentdidmount (react have lost of state we want to call fun for load data after all state complited thats why we use componentDidMount() and we call fun inside this things)
componentDidMount(){
  this.loadVenues();
}
openModal = () =>
  {
    this.setState({isModalOpen:true})
  }
  closeModal = () =>
  {
    this.setState({isModalOpen:false})
  }

  render()
  {
    return(
    <div className="app">
      <div className="container">
        <div className="venues">
          {
            this.state.venues.map((venue) => {
              var venueProps = {
                ...venue,
                key:venue.id,
                openModal: this.openModal,
                loadVenue: this.loadVenue
              };
              return(<Venue {...venueProps} />) ;
            })
           
          }
        </div>  

        <div className="venue-filters">
          
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <div role="group" className="btn-group btn-group-toggle">
              <label className="venue-filter btn active btn-primary">
                <input name="venue-filter" type="radio" autoComplete="off" value="all" checked=""/>All
              </label>
              <label className="venue-filter btn btn-primary">
                <input name="venue-filter" type="radio" autoComplete="off" value="food"/>Food
              </label>
              <label className="venue-filter btn btn-primary">
                <input className="venue-filter" type="radio" autoComplete="off" value="drinks"/>Drinks
              </label>
              <label className="venue-filter btn btn-primary">
                <input name="venue-filter" type="radio" autoComplete="off" value="others"/>Others
              </label>
            </div>
          </div>
        </div>
      </div>

      <Modal show={this.state.isModalOpen} onHide={() =>{this.closeModal()}}>
          
          <Modal.Body>

            {
              this.state.watchedVenue !== null ? (
                <div className="venue-popup-body row">
                  <div className="col-6">
                    <h1 className="venue-name">{this.state.watchedVenue.name}</h1>
                    <p>{this.state.watchedVenue.description}</p>
                    <p>{this.state.watchedVenue.address[0]}</p>
                    <p>{this.state.watchedVenue.address[1]}</p>
                    <p>
                    <span className="badge venue-type">{this.state.watchedVenue.category}</span>
                    </p>
                  </div>
                  <div className="col-6">
                    <img src={this.state.watchedVenue.photo}/>
                  </div>
                </div>
              ) : 'Loading...'
            }
            

          </Modal.Body>
          
        </Modal>
      {/* <div className="modal" id="venue-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
     
            <div className="modal-body">

              <div className="venue-popup-body row">
                <div className="col-6">
                  <h1 className="venue-name">The Store</h1>
                  <p>5B Gore St</p>
                  <p>Auckland</p>
                  <p><span className="badge venue-type">Café</span></p>
                </div>
                <div className="col-6">
                  <img src="https://fastly.4sqi.net/img/general/200x200/194220_nI7vTqtIFQncbe7Zgn_XLymzqM78Cx-aZ_gySunjz-M.jpg" className="img-fluid" alt="Responsive image"/>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div> */}
    </div>

    );
  }
}
export default App;
