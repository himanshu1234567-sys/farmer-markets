import { React, Fragment } from "react";
import Table from "react-bootstrap/Table";
const Activity = () => {
    const activities = JSON.parse(localStorage.getItem('saveActivityData'));
    console.log(activities);
    let id=1 ;

  return (
    <Fragment>
      <Table striped bordered hover className="mt-5" style={{width:'70%' , margin:"auto"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>Activity</th>
            <th>Date And Time</th>
          </tr>
        </thead>
        <tbody>
            
         {
            activities.map((activity , index)=>{
                return(
                  <tr key={index}>
                    <td>{id++}</td>
                    <td>{activity.activity}</td>
                    <td>{activity.Time}</td>
                  </tr>
                    
                )
              
            })
         }
        </tbody>
      </Table>
    </Fragment>
  );
};

export default Activity;
