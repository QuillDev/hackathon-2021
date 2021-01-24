import {Component} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import "./dashboard.css"
import joinImage from "./join.png";
import {Link} from "react-router-dom";
import {icon} from "@fortawesome/fontawesome-svg-core";

class Dashboard extends Component{

    /**
     * Call the api and get list of user favorites
     * @returns {Promise<void>}
     */
    async callAPI() {
        try {
            let data = await fetch(`https://api.quilldev.tech/api/getFavorites?email=${localStorage.email}`)
                .then(res => res.json())

            //get the response from the data
            let result = data.result;

            //check for a bad response
            if(!result){
                console.log("error retrieving data");
                return;
            }

            this.populateServerList(result);
        } catch (error){
            console.log(error);
        }
    }

    /**
     * Submit a friend request to a new user
     * @param event of the submission
     * @returns {Promise<void>}
     */
    async submitFriendRequest(event){
        event.preventDefault();

        //get the form data
        const data = new FormData(event.target);

        //get the entered name for the chat
        let code = data.get("friend-email");

        let res = await fetch(`https://api.quilldev.tech/api/sendFriendRequest?sender=${localStorage.email}&receiver=${code}`);
        event.target.reset();

    }

    /**
     * Populate the server list
     * @param servers
     */
    populateServerList(servers){

        //get the div for the list
        const serverList = document.getElementById("serverList");

        //generate the users chat room list
        for(const server of servers) {
            let name = server.name.substring(0, 2) || server.name;
            serverList.innerHTML += ` <a  href="https://hackathon.quilldev.tech/chat?roomCode=${server.code}"><div class="server-logo-text"><div>${name}</div></div></a>`;
        }
    }

    async getFriendRequests(){
        const res = await fetch(`https://api.quilldev.tech/api/getFriendRequests?email=${localStorage.email}`)
            .then(res => res.json());

        for(const entry of res){
            this.addFriendRequest(entry);
        }
    }

    async loadFriends(){
        const friends = await fetch(`https://api.quilldev.tech/api/getFriends?email=${localStorage.email}`)
            .then(res => res.json());

        const friendDiv = document.getElementById("friendsList")
        
        for(const friend of friends){
            friendDiv.innerHTML += `<img class="friend-icon" src=${friend.icon} alt={}><p>${friend.name}</p>`;
        }
    }

    replyToRequest(a){
        console.log(a);
    }
    addFriendRequest(entry){

        const div = document.getElementById("friend-requests");

        div.innerHTML += `<p></p>`

        let iconToAdd = document.createElement("img");
        iconToAdd.src = entry.icon;
        iconToAdd.classList ="server-logo";
        let paraToAdd = document.createElement("p");
        let namePara = document.createElement("p");
        namePara.textContent = "Test"
        paraToAdd.append(iconToAdd);
        div.append(paraToAdd)
        div.innerHTML += `Friend Request: ${entry.name}: ${entry.email}`

    }

  componentWillMount() {
        this.callAPI().then(() => null);
        this.getFriendRequests();
        this.loadFriends();
   }

    render() {
        return (
            <div style={{height:"100%"}}>
                <Container style={{height:"100%"}} fluid={true}>
                    <Row style={{height:"100%"}}>
                        <Col className="side-column" xs={2}>

                            <div id="serverList">
                                <h1 style={{paddingTop: "15px"}}>SERVERS:</h1>
                                <Link to="../join"><Image className="server-logo" src={joinImage}/></Link>
                            </div>
                        </Col>
                        <Col xs={8} id="center-column">
                            <div id="welcomeMessage">
                                <br/>
                                <h2>Welcome {localStorage.name}!</h2>
                                <br/>
                                <h2>Friend Requests</h2>
                                <div id="friend-requests">
                                </div>
                            </div>

                        </Col>
                        <Col className={"side-column"} xs={2}>
                            <h1 style={{paddingTop: "15px"}}>Friends</h1>
                            <form onSubmit={ async (e) => await this.submitFriendRequest(e)}>
                                <label>Add a friend by email: </label>
                                <input name="friend-email"/>
                            </form>
                            <div id="friendsList">

                            </div>

                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

export default Dashboard;