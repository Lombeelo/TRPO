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
*/

function callApi(callType, apiFuncName, formObj, callback) {
    const baseUrl = 'https://localhost:7197/api/schedule/';
    const options = {
        method: callType,
        url: baseUrl + apiFuncName,
        headers: { 'Content-Type': 'application/json' },
        data: formObj
    };

    axios.request(options).then(callback)
        .catch(function (error) {
            console.error(error);
        });
}

function createStringObj(stringArr) {
    return stringArr.reduce((obj, string) => {
        obj[string] = string;
        return obj;
    }, {});
}

const FormApiGetFunctions = createStringObj([
    "GetSubjectTypeAvailable",
    "GetParaAvailable",
    "GetSubjectsAvailable",
    "GetProfessorsAvailable",
    "GetGroupsAvailable",
    "GetDatesOccupied",
    "GetCabinetsOccupied"]
);

const FormApiPostFunctions = createStringObj([
    "PostScheduleEntryFromForm"]
);

// Makes a get request, asynchronous, result can be fetched using callback(result).
function callApiGet(apiFuncName, obj, callback) {
    callApi('GET', apiFuncName, obj, callback);
}

// Makes a post request, asynchronous, result can be fetched using callback(result).
function callApiPost(apiFuncName, obj, callback) {
    callApi('POST', apiFuncName, obj, callback);
}

const ScheduleApiGetFunctions = createStringObj([
    "GetScheduleBetweenDates",
    "GetScheduleByDateIntervalAndProfessorId",
    "GetScheduleByDateIntervalAndGroupId",
    "GetAllGroups",
    "GetAllProfessors"
]);

export { callApiGet, callApiPost, FormApiGetFunctions, FormApiPostFunctions, ScheduleApiGetFunctions }