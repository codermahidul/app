import '../../../tokeniz/tokenize2.js';

import { Fetching, GetProfessionalUserOnlineInfo } from '../../Fetch/Common.js';
import {
  GetCourse,
  GetEducation,
  GetExperienceser,
  GetHonors,
  GetLanguage,
  GetLicense,
  GetOrganization,
  GetPatent,
  GetProject,
  GetPublication,
  GetScore,
  GetSkill,
  GetVExperienceser,
  GetWebSiteUser
} from './ProfileFetch.js';
import {
  LoadSelectOptionCountry,
  LoadSelectOptionMyExperience,
  course,
  editInfo,
  honors,
  organizations,
  patent,
  project,
  score
} from './ProfileModalFunction.js';
import {
  ShowCourse,
  ShowEducation,
  ShowExperience,
  ShowHonors,
  ShowLanguage,
  ShowLicense,
  ShowOrganization,
  ShowPatent,
  ShowProject,
  ShowPublication,
  ShowScore,
  ShowSkill,
  ShowUserInfo,
  ShowVExperience,
  ShowWebSite
} from './ProfileShows.js';
import { block, unblock } from '../../functions/Block.js';
import { resetForm, setFormElementValue, setSelectsClassModal } from '../../functions/Common.js';

import AddEven from "../../functions/AddEventListner.js";
import ShowModals from "../../functions/ShowModal.js";
import checkValue from '../../functions/Checked.js';
import getObjFormData from '../../functions/ObjectFormData.js';

const editInfoBtn = document.getElementById("editInfoBtn");
const addwebBtn = document.getElementById("addwebBtn");
const aboutBtn = document.getElementById("aboutBtn");
const experincebtn = document.getElementById("experincebtn");
const educatinBtn = document.getElementById("educatinBtn");
const btnve = document.getElementById("btnve");
const licensebtn = document.getElementById("licensebtn");
const frmpubbtn = document.getElementById("frmpubbtn");
const btnCourse = document.getElementById("btnCourse");
const projectbtn = document.getElementById("projectbtn");
const btnhonors = document.getElementById("btnhonors");
const scorebtn = document.getElementById("scorebtn");
const btnlang = document.getElementById("btnlang");
const btnorg = document.getElementById("btnorg");
const btnskill = document.getElementById("btnskill");
const patentbtn = document.getElementById("patentbtn");
const removeBtn = document.getElementById("removeBtn");


const website_url = document.getElementById("website_url");
const website_type = document.getElementById("website_type");
const about = document.getElementById("about");
const title = document.getElementById("title");
const school = document.getElementById("school");
const degree = document.getElementById("degree");
const organization = document.getElementById("organization");
const role = document.getElementById("role");
const license_name = document.getElementById("license_name");
const issuin = document.getElementById("issuin");
const title_publication = document.getElementById("title_publication");
const publisher = document.getElementById("publisher");
const patent_country_id = document.getElementById("patent_country_id");
const title_patent = document.getElementById("title_patent");
const course_name = document.getElementById("course_name");
const course_number = document.getElementById("course_number");
const project_name = document.getElementById("project_name");
const honors_title = document.getElementById("honors_title");
const scorev = document.getElementById("score");
const language = document.getElementById("language");
const proficiency = document.getElementById("proficiency");
const organization_name = document.getElementById("organization_name");
const display_name = document.getElementById("display_name");


window.idOnline = 0;


const setData = (result, elements) => {
  if (result.status !== "true") {
    unblock();
    toast("somting is wrong", "error");
    return false;
  }

  let response = result.data.data[0];
  for (let i = 0; i < elements.length; i++) {
    switch (elements[i].type) {
      case "select-one": {
        $("#" + elements[i].id).val(response[elements[i].name]).trigger("change");
        break;
      }
      case "checkbox": {
        if (elements[i].value === response[elements[i].name])
          $("#" + elements[i].id).prop('checked', true);
        else
          $("#" + elements[i].id).prop('checked', false);
        break;
      }
      case "radio": {
        if (elements[i].value === response[elements[i].name])
          $("#" + elements[i].id).prop('checked', true);
        else
          $("#" + elements[i].id).prop('checked', false);
        break;
      }
      default: {
        $("#" + elements[i].id).val(response[elements[i].name]);
      }
    }

  }
}

const Edits = (event) => {
  
  block();
  let data = event.currentTarget.dataset;
  let form = data.form
  let gets = data.get
  let id = data.id

  let param = { idSearch: id,trash:"0" };
  let modals = data.modal;

  let btn = data.btn;

  window[btn].dataset.edit = "true"
  window[btn].dataset.editid = id
  let elements = document.forms[form];

  switch (gets) {
    case "GetExperienceser": {
      GetExperienceser(param).then((result) => {
        setData(result, elements)
      })
      break;
    }
    case "GetWebSiteUser": {
      GetWebSiteUser(param).then((result) => {
        setData(result, elements);

      })
      break;
    }
    case "GetEducation": {
      GetEducation(param).then((result) => {
        setData(result, elements);

      })
      break;
    }

    case "GetVExperienceser": {
      GetVExperienceser(param).then((result) => {
        setData(result, elements);

      })
      break;
    }
    case "GetLicense": {
      GetLicense(param).then((result) => {
        setData(result, elements);

      })
      break;
    }
    case "GetPublication": {
      GetPublication(param).then((result) => {
        setData(result, elements);

      })
      break;
    }
    case "GetPatent": {

      LoadSelectOptionCountry("patent_country_id");
      setTimeout(() => {
        GetPatent(param).then((result) => {
          setData(result, elements);
        })
      }, 1000);

      break;
    }
    case "GetCourse": {
      LoadSelectOptionMyExperience("course_experience_id")
      setTimeout(() => {
        GetCourse(param).then((result) => {
          setData(result, elements);

        })
      }, 1000);
      break;
    }
    case "GetProject": {
      LoadSelectOptionMyExperience("project_experience_id")
      setTimeout(() => {
        GetProject(param).then((result) => {
          setData(result, elements);

        })
      }, 1000);

      break;
    }
    case "GetHonors": {
      LoadSelectOptionMyExperience("honors_experience_id")
      setTimeout(() => {
        GetHonors(param).then((result) => {
          setData(result, elements);

        })
      }, 1000);

      break;
    }
    case "GetScore": {
      LoadSelectOptionMyExperience("score_experience_id")
      setTimeout(() => {
        GetScore(param).then((result) => {
          setData(result, elements);

        })
      }, 1000);

      break;
    }
    case "GetLanguage": {
      GetLanguage(param).then((result) => {
        setData(result, elements);

      })
      break;
    }
    case "GetOrganization": {
      LoadSelectOptionMyExperience("organization_experience_id")
      setTimeout(() => {
        GetOrganization(param).then((result) => {
          setData(result, elements);

        })
      }, 1000);

      break;
    }
    default: {
      unblock();
    }
  }
  unblock();
  $("#" + modals).modal("show");

}

const Remove = (event) => {

  resetForm("frmRemove")
  let data = event.currentTarget.dataset;
  let modal = data.modal;
  let url = data.url;
  let id = data.id;
  removeBtn.dataset.rmoveid = id;
  removeBtn.dataset.action = url;
  $("#" + modal).modal("show");

}

const RemoveSkill = (event) => {
  let idSearch = event.currentTarget.dataset.id;
  Fetching("userBusinessAction/removeUserSkill", { idSearch }).then((data) => {
    GetAllData();
  })

}

const RunAfterShows=()=>{
  
  let btnedit = document.getElementsByClassName("btn-edit");
  let btnremove = document.getElementsByClassName("btn-remove");
  let skillremove = document.getElementsByClassName("remove-skill");

  for (let i = 0; i < btnedit.length; i++) {

    btnedit[i].onclick = (e) => {

      Edits(e)
    };
    btnremove[i].onclick = (e) => {

      Remove(e)
    };

    if(skillremove[i]!==undefined)
    {
      skillremove[i].onclick = (e) => {

        RemoveSkill(e)
      };
    }

  };
}


const GetAllData = () => {
  block();
  let param = { user_id: window.idOnline,trash:"0" };
  setTimeout(() => {
    if (idOnline !== 0) {
      GetProfessionalUserOnlineInfo().then((data) => {
        ShowUserInfo(data.data[0]);
        RunAfterShows();
      })

      GetWebSiteUser(param).then((data) => {
        ShowWebSite(data.data.data);
        RunAfterShows();
      });

      GetEducation(param).then((data) => {
        ShowEducation(data.data.data);
        RunAfterShows();
      });

      GetExperienceser(param).then((data) => {
        ShowExperience(data.data.data);
        RunAfterShows();
      });

      GetVExperienceser(param).then((data) => {
        ShowVExperience(data.data.data);
        RunAfterShows();
      });
      GetLicense(param).then((data) => {
        ShowLicense(data.data.data);
        RunAfterShows();
      });
      GetPublication(param).then((data) => {
        ShowPublication(data.data.data);
        RunAfterShows();
      });
      GetPatent(param).then((data) => {
        ShowPatent(data.data.data);
        RunAfterShows();
      });

      GetCourse(param).then((data) => {
        ShowCourse(data.data.data);
        RunAfterShows();
      });

      GetProject(param).then((data) => {
        ShowProject(data.data.data);
        RunAfterShows();
      });

      GetHonors(param).then((data) => {
        ShowHonors(data.data.data);
        RunAfterShows();
      });
      GetScore(param).then((data) => {
        
        ShowScore(data.data.data);
        RunAfterShows();
      });

      GetLanguage(param).then((data) => {
        ShowLanguage(data.data.data);
        RunAfterShows();
      });

      GetOrganization(param).then((data) => {
        ShowOrganization(data.data.data);
        RunAfterShows();
      });

      GetSkill(param).then((data) => {
        ShowSkill(data.data.data);
        RunAfterShows();
      });
    }
    unblock();
  }, 2000)


}

const showModal = (event) => {

  let functions = event.currentTarget.dataset.functions;
  switch (functions) {
    case "editInfo": {
      block();
      editInfo(event);
      GetProfessionalUserOnlineInfo().then((data) => {
        if (data.status === "true") {

          setTimeout(() => {
            setFormElementValue(data.data[0]);
            unblock();
          }, 1000)
        } else
          unblock();
      });
      break
    }
    case "patent": {
      patent(event);
      break;
    }
    case "course": {
      course(event);
      break;
    }

    case "project": {
      project(event);
      break;
    }

    case "honors": {
      honors(event);
      break;
    }

    case "score": {
      score(event);
      break;
    }

    case "organiz": {
      organizations(event);
      break;
    }

    default: {
      ShowModals(event);
    }
  }


}

const SaveDataModal = (btn, form, url, check = [], add = [], setNull = false) => {
  let checkValues = true;
  for (let i = 0; i < check.length; i++) {
    if (!checkValue(check[i])) {
      checkValues = false;
      break;
    }
  }
  
  if (!checkValues)
    return false;
  block();
  btn.disabled = true;
  let formData = getObjFormData(form, setNull);
  if (add.length > 0) {
    for (let i = 0; i < add.length; i++)
      formData = { ...formData, ...{ [add[i].name]: add[i].value } };
  }
  Fetching(url, formData).then((data) => {
    btn.disabled = false;
    unblock();
    if (data.status === "true") {
      toast("successful", "success");
      $("#" + btn.dataset.id).modal("hide");
      GetAllData();
      resetForm(form);
    }
    else {
      toast(data.err, "error");
    }
  })
}

const RunActionData = (btn, frm, action, require, param, setNull) => {
  SaveDataModal(btn, frm, action, require, param, setNull);
  btn.dataset.edit = "false";
  btn.dataset.editid = "";
}

$('.select2').select2({
  selectOnClose: true,

});

setSelectsClassModal("select2","","modalEditInfo")
setSelectsClassModal("select2P","","modalPatent")


$('.tokenize-custom-demo1').tokenize2({
  tokensAllowCustom: true,
  dataSource: function (search, object) {
    Fetching("fetchData/proof_get", { type: "skill", title: search }).then((data) => {
      let items = [];
      let datas = data.data.data;
      for (let i = 0; i < datas.length; i++) {
        items.push({ value: datas[i].id, text: datas[i].title })
      }
      object.trigger('tokenize:dropdown:fill', [items]);
    })


  }
});

AddEven(".modalbtn", 'click', showModal);

editInfoBtn.onclick = () => {
  SaveDataModal(editInfoBtn, "frmEditInfo", "userAction/updateMyProfessionalUserInfo",[display_name]);

}

addwebBtn.onclick = () => {
  if (addwebBtn.dataset.edit === "true") {
    RunActionData(addwebBtn, "frmWebSite", "userBusinessAction/updateWebsite", [website_url, website_type], [{ name: 'idSearch', value: addwebBtn.dataset.editid }], true);

  }
  else
    SaveDataModal(addwebBtn, "frmWebSite", "userBusinessAction/addWebsite", [website_url, website_type]);
}

aboutBtn.onclick = () => {

  SaveDataModal(aboutBtn, "frmAbout", "userAction/updateMyProfessionalUserInfo", [], [], true);
}

experincebtn.onclick = () => {
  if (experincebtn.dataset.edit === "true") {
    RunActionData(experincebtn, "frmexperience", "userBusinessAction/updateExperience", [title],
      [{ name: 'idSearch', value: experincebtn.dataset.editid }], true);

  }
  else
    SaveDataModal(experincebtn, "frmexperience", "userBusinessAction/addExprience", [title]);
}

educatinBtn.onclick = () => {
  if (educatinBtn.dataset.edit === "true") {
    RunActionData(educatinBtn, "frmEducation", "userBusinessAction/updateEducation", [school, degree],
      [{ name: 'idSearch', value: educatinBtn.dataset.editid }], true);

  }
  else
    SaveDataModal(educatinBtn, "frmEducation", "userBusinessAction/addEducation", [school, degree]);
}

btnve.onclick = () => {
  if (btnve.dataset.edit === "true") {
    RunActionData(btnve, "frmve", "userBusinessAction/updateVExperience", [organization, role],
      [{ name: 'idSearch', value: btnve.dataset.editid }], true);

  }
  else
    SaveDataModal(btnve, "frmve", "userBusinessAction/addVExperience", [organization, role]);
}

licensebtn.onclick = () => {
  if (licensebtn.dataset.edit === "true") {
    RunActionData(licensebtn, "frmlic", "userBusinessAction/updateLicense", [license_name, issuin],
      [{ name: 'idSearch', value: licensebtn.dataset.editid }], true);

  }
  else
    SaveDataModal(licensebtn, "frmlic", "userBusinessAction/addLicense", [license_name, issuin]);
}

frmpubbtn.onclick = () => {
  if (frmpubbtn.dataset.edit === "true") {
    RunActionData(frmpubbtn, "frmpub", "userBusinessAction/updatePublication", [title_publication, publisher],
      [{ name: 'idSearch', value: frmpubbtn.dataset.editid }], true);

  }
  else
    SaveDataModal(frmpubbtn, "frmpub", "userBusinessAction/addPublication", [title_publication, publisher]);
}

patentbtn.onclick = () => {
  if (patentbtn.dataset.edit === "true") {
    RunActionData(patentbtn, "frnpatent", "userBusinessAction/updatePatent", [title_patent, patent_country_id],
      [{ name: 'idSearch', value: patentbtn.dataset.editid }], true);

  }
  else
    SaveDataModal(patentbtn, "frnpatent", "userBusinessAction/addPatent", [title_patent, patent_country_id]);
}

btnCourse.onclick = () => {
  if (btnCourse.dataset.edit === "true") {
    RunActionData(btnCourse, "frmcourse", "userBusinessAction/updateCourse", [course_name, course_number],
      [{ name: 'idSearch', value: btnCourse.dataset.editid }], true);

  }
  else
    SaveDataModal(btnCourse, "frmcourse", "userBusinessAction/addCourse", [course_name, course_number]);
}

projectbtn.onclick = () => {
  if (projectbtn.dataset.edit === "true") {
    RunActionData(projectbtn, "frmProject", "userBusinessAction/updateProject", [project_name],
      [{ name: 'idSearch', value: projectbtn.dataset.editid }], true);

  }
  else
    SaveDataModal(projectbtn, "frmProject", "userBusinessAction/addProject", [project_name]);
}

btnhonors.onclick = () => {
  if (btnhonors.dataset.edit === "true") {
    RunActionData(btnhonors, "frmhonors", "userBusinessAction/updateHonors", [honors_title],
      [{ name: 'idSearch', value: btnhonors.dataset.editid }], true);

  }
  else
    SaveDataModal(btnhonors, "frmhonors", "userBusinessAction/addHonors", [honors_title]);
}

scorebtn.onclick = () => {
  if (scorebtn.dataset.edit === "true") {
    RunActionData(scorebtn, "frmScore", "userBusinessAction/updateScore", [scorev],
      [{ name: 'idSearch', value: scorebtn.dataset.editid }], true);

  }
  else
    SaveDataModal(scorebtn, "frmScore", "userBusinessAction/addScore", [scorev]);
}

btnlang.onclick = () => {
  if (btnlang.dataset.edit === "true") {
    RunActionData(btnlang, "frmlang", "userBusinessAction/updateLanguage", [language, proficiency],
      [{ name: 'idSearch', value: btnlang.dataset.editid }], true);

  }
  else
    SaveDataModal(btnlang, "frmlang", "userBusinessAction/addLanguage", [language, proficiency]);
}

btnorg.onclick = () => {
  if (btnorg.dataset.edit === "true") {
    RunActionData(btnorg, "frmorg", "userBusinessAction/updateOrganization", [organization_name],
      [{ name: 'idSearch', value: btnorg.dataset.editid }], true);

  }
  else
    SaveDataModal(btnorg, "frmorg", "userBusinessAction/addOrganization", [organization_name]);
}

btnskill.onclick = () => {
  let skills = $("#skills").val();
  let end1 = 0;
  let end2 = 0;
  if (skills.length <= 0) {
    toast("skill as empty !", "error");
    return false;
  }
  let proof_id = [];
  let skill_name = []
  skills.forEach(element => {
    if (!isNaN(element))
      proof_id.push(element);
    else
      skill_name.push(element);

  });

  end1 = proof_id.length;
  end2 = skill_name.length;
  block();
  btnskill.disabled = true;
  for (let i = 0; i < proof_id.length; i++) {
    Fetching("userBusinessAction/addUserSkill", { proof_id: proof_id[i] }).then(() => {
      end1--;
      if (end1 <= 0 && end2 <= 0) {
        unblock();
        btnskill.disabled = false;
        toast("successful", "success");
        $("#" + btnskill.dataset.id).modal("hide");

        $('.tokenize-custom-demo1').tokenize2().trigger('tokenize:clear');
        GetAllData();
      }
    });
  }

  for (let i = 0; i < skill_name.length; i++) {
    Fetching("userBusinessAction/addUserSkill", { skill_name: skill_name[i] }).then(() => {
      end2--;
      if (end1 <= 0 && end2 <= 0) {

        unblock();
        btnskill.disabled = false;
        toast("successful", "success");
        $("#" + btnskill.dataset.id).modal("hide");
        $('.tokenize-custom-demo1').tokenize2().trigger('tokenize:clear');
        GetAllData();

      }
    })
  }


}

removeBtn.onclick = () => {

  block();
  let data = removeBtn.dataset;
  let rmoveid = data.rmoveid
  let id = data.id
  let action = "userBusinessAction/" + data.action
  let formData = getObjFormData("frmRemove");
  formData = { ...formData, ...{ 'idSearch': rmoveid } };
  if (formData.delete_type === "disabled") {
    action = action.replace("removeUser", "update");
    formData = { 'idSearch': rmoveid, "trash": "1" };
  }

  Fetching(action, formData).then((data) => {
    if (data.status === "true") {
      $("#" + id).modal("hide");
      toast("successful", "success");
      GetAllData();
      resetForm("frmRemove");
    } else {
      toast(data.err, "error");
    }

    unblock();
  })


}

GetProfessionalUserOnlineInfo().then((data) => {
 idOnline = data.data[0].id
  ShowUserInfo(data.data[0]);
  GetAllData();
})

