import React,{Component} from 'react';

class Venue extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div className="card venue">
            <div className="card-body">
              <h1 className="venue-name" data-toggle="modal" data-target="#venue-modal">The Store</h1>
              <p>5B Gore St</p>
              <p>Auckland</p>
              <p><span className="badge venue-type">Café</span></p>
            </div>
          </div>
        
        )
    }
}

export default Venue;