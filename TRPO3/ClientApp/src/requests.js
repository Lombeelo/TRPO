import axios from "axios";

/*
form object is :
{
    "Date": null,
    "Para": null,
    "Cabinet": null,
    "SubjectId": null,
    "SubjectTypeId": null,
    "GroupIds": [],
    "ProfessorIds": []
}
Form API

    "GetSubjectTypeAvailable",
    "GetParaAvailable",
    "GetSubjectsAvailable",
    "GetProfessorsAvailable",
    "GetGroupsAvailable",
    "GetDatesOccupied",
    "GetCabinetsOccupied"

    "PostScheduleEntryFromForm"


GetScheduleBetweenDates request object :
{
    "BeginDate": "2022-09-30",
    "EndDate": "2022-10-30"
}

GetScheduleByDateIntervalAndProfessorId request object :

{
    "DateSpan": {
        "BeginDate": "2022-09-30",
        "EndDate": "2022-10-30"
    },
    "ProfessorId" : 2
}

GetScheduleByDateIntervalAndGroupId request object :

{
    "DateSpan": {
        "BeginDate": "2022-09-30",
        "EndDate": "2022-10-30"
    },
    "GroupId" : 1
}

Schedule API
    "GetScheduleBetweenDates",
    "GetScheduleByDateIntervalAndProfessorId",
    "GetScheduleByDateIntervalAndGroupId",
    "GetAllGroups",
    "GetAllProfessors"
    "GetAllSubjects"
    "GetAllSubjectTypes"
*/

function callApi(callType, apiFuncName, formObj, callback) {
    const baseUrl = 'https://localhost:44479/api/schedule/';
    const options = {
        method: callType,
        url: baseUrl + apiFuncName,
        headers: { 'Content-Type': 'application/json' },
        data: formObj
    };

    return axios.request(options).then(callback)
        .catch(function (error) {
            console.error(error);
        });
}

// Makes a get request, asynchronous, result can be fetched using callback(result).
function callApiGet(apiFuncName, obj, callback) {
    return callApi('GET', apiFuncName, obj, callback);
}

// Makes a post request, asynchronous, result can be fetched using callback(result).
function callApiPost(apiFuncName, obj, callback) {
    return callApi('POST', apiFuncName, obj, callback);
}


export { callApiGet, callApiPost }