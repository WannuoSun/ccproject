var apigClient = apigClientFactory.newClient({
    region: 'us-east-1', // OPTIONAL: The region where the API is deployed, by default this parameter is set to us-east-1
    apiKey: 'WFY7aanS24uJZxz05XHo4o1wN7zSszFaOGeg7Ok5'
});



function userLogin(){
    var user_login_id = document.getElementById('user_login_id');
    console.log(user_login_id)
    var user_login_password=document.getElementById('user_login_password');
    console.log(user_login_password)
    if (!user_login_id.value) {
        alert('Please Enter ID!');
    } 
    else if (!user_login_password.value){
        alert('Please Enter Password');
    }
    else {
        user_login_id_value = user_login_id.value;
        user_login_id.value = "";
        user_login_password_value = user_login_password.value;
        user_login_password.value = "";
        doUserLogin(user_login_id_value,user_login_password_value);
    }
};

function doUserLogin(user_id,user_password){
    var params = {'uID' : user_id,
                  'uPSWD' : user_password};
    console.log(params)
    var body = {};
    var additionalParams = {};

    
    apigClient.loginstatusGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}

//要改 晚点改
function editProfile(){
    var edit_input_id = document.getElementById('edit_user_id');
    console.log(edit_input_id)
    var edit_input_name=document.getElementById('edit_user_name');
    console.log(edit_input_name)
    if (!edit_input_id.value) {
        alert('Please Enter ID!');
    } else {
        edit_input_id_value = edit_input_id.value;
        edit_input_id.value = "";
        edit_input_name_value = edit_input_name.value;
        edit_input_name.value = "";
        // alert(search_input_value);
        doEditProfile(edit_input_id_value,edit_input_name_value);
    }
};

function doEditProfile(edit_id,edit_name){
    var params = {'uID' : edit_id,
                  'uFN' :  edit_name};
    console.log(params)
    var body = {};
    var additionalParams = {};

    
    apigClient.editprofileGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
            

        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}


function createMeeting(){
    var create_duration=document.getElementById('create_meeting_duration')
    console.log(create_duration)
    var create_host = document.getElementById('create_meeting_host');
    console.log(create_host)
    var create_location=document.getElementById('create_meeting_location')
    console.log(create_location)
    var create_description = document.getElementById('create_meeting_description');
    console.log(create_description)
    var create_participants=document.getElementById('create_meeting_participants');
    console.log(create_participants)

    if (!create_duration.value) {
        alert('Please Enter Duration!');
    } 
    else if (!create_host.value){
        alert('Please Enter Host ID');
    }
    else if (!create_location.value){
        alert('Please Enter Host Location');
    }
    else if (!create_description.value){
        alert('Please Enter Description');
    }
    else if (!create_participants.value){
        alert('Please Enter Meeting Participants');
    }
    else {
        create_duration_value = create_duration.value;
        create_duration.value = "";
        create_host_value = create_host.value;
        create_host_value.value = "";
        create_location_value = create_location.value;
        create_location.value = "";
        create_description_value = create_description.value;
        create_description_value.value = "";
        create_participants_value = create_participants.value;
        create_participants.value = "";

        doCreateMeeting(create_duration_value,create_host_value,create_location_value,create_description_value,create_participants_value);
    }
};

function doCreateMeeting(c_duration,c_host,c_location,c_description,c_participants){
    var params={};
    var bodystr = {
            "users":c_participants,
            "duration":parseInt(c_duration),
            "host":c_host,
            "location":c_location,
            "description":c_description
    };
    body=JSON.stringify(bodystr)
    console.log(body)
    var additionalParams = {};

    
    apigClient.createmeetingPost(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}

function findUserMeetings(){
    var user_current_id =  ""; //static variable maybe.
    doUserLogin(user_current_id);
    
};

function doFindUserMeetings(cur_id){
    var params = {'uID' : user_id};
    console.log(params)
    var body = {};
    var additionalParams = {};

    
    apigClient.findusermeetingsGet(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}


//sample
function voteMeeting(){

        doVoteMeeting();
}

function doVoteMeeting(a,b,c,d){
    var params={};
    var bodystr = {
            "user":a,
            "meetID":b,
            "day":c,
            "time":d
           
    };
    body=JSON.stringify(bodystr)
    console.log(body)
    var additionalParams = {};

    apigClient.votemeetingPost(params, body, additionalParams)
        .then(function(result) {
            // success callback
            console.log("Result : ", result);
            data = result["data"]
            console.log(data)
       
        }).catch(function(result) {
            // error callback
            console.log(result);
        });
}
