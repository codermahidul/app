import AddEven from "../../../functions/AddEventListner.js";
import ShowModals from "../../../functions/ShowModal.js";
import { editInfo } from './ProfileModalFunction.js';
import { GetUserOnlineInfo, Fetching, CreateSelectOption } from '../../../Fetch/Common.js';
import { setFormElementValue, resetForm } from '../../../functions/Common.js';
import { block, unblock } from '../../../functions/Block.js';
import getObjFormData from '../../../functions/ObjectFormData.js';
import checkValue from '../../../functions/Checked.js';
import '../../../../tokeniz/tokenize2.js';
import { SwalRemoveFetch } from '../../../functions/SwalDelete.js';
import {
  GetWebSiteUser,
  GetLanguage,
  GetSkill,
  GetLink
} from './ProfileFetch.js';
import {
  ShowUserInfo,
  ShowWebSite,
  ShowLanguage,
  ShowSkill,
  ShowLink
} from './ProfileShows.js';



const editInfoBtn = document.getElementById("editInfoBtn");
const addwebBtn = document.getElementById("addwebBtn");
const aboutBtn = document.getElementById("aboutBtn");
const btnve = document.getElementById("linkBtn");

const btnlang = document.getElementById("btnlang");
const btnskill = document.getElementById("btnskill");

const removeBtn = document.getElementById("removeBtn");


const website_url = document.getElementById("website_url");
const website_type = document.getElementById("website_type");
const typeLink = document.getElementById("type_link");
const Tag = document.getElementById("tag");

const language = document.getElementById("language");
const proficiency = document.getElementById("proficiency");
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

  let param = { idSearch: id };
  let modals = data.modal;

  let btn = data.btn;

  window[btn].dataset.edit = "true"
  window[btn].dataset.editid = id
  let elements = document.forms[form];

  switch (gets) {

    case "GetWebSiteUser": {
      GetWebSiteUser(param).then((result) => {
        setData(result, elements);

      })
      break;
    }

    case "GetLanguage": {
      GetLanguage(param).then((result) => {
        setData(result, elements);

      })
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

const RunAfterShows = () => {

  let btnedit = document.getElementsByClassName("btn-edit");
  let btnremove = document.getElementsByClassName("btn-remove");
  let skillremove = document.getElementsByClassName("remove-skill");
  let removeLinks = document.getElementsByClassName("removeLinks");
  for (let i = 0; i < btnedit.length; i++) {

    btnedit[i].onclick = (e) => {

      Edits(e)
    };
    btnremove[i].onclick = (e) => {

      Remove(e)
    };

    if (skillremove[i] !== undefined) {
      skillremove[i].onclick = (e) => {

        RemoveSkill(e)
      };
    }

  };

  for (let i = 0; i < removeLinks.length; i++) {

    removeLinks[i].onclick = (e) => {

      removeLinksItem(e)
    };
  }
}


const GetAllData = () => {
  block();
  let param = { user_id: window.idOnline, trash: "0" };
  setTimeout(() => {
    if (idOnline !== 0) {
      GetUserOnlineInfo().then((data) => {
        ShowUserInfo(data.data[0]);
        RunAfterShows();
      })

      GetWebSiteUser(param).then((data) => {
        ShowWebSite(data.data.data);
        RunAfterShows();
      });


      GetLanguage(param).then((data) => {
        ShowLanguage(data.data.data);
        RunAfterShows();
      });


      GetSkill(param).then((data) => {
        ShowSkill(data.data.data);
        RunAfterShows();
      });

      GetLink(param).then((data) => {
        ShowLink(data.data.data);
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
      GetUserOnlineInfo().then((data) => {
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
  SaveDataModal(editInfoBtn, "frmEditInfo", "userBusinessAction/editMyInfo", [display_name]);

}

addwebBtn.onclick = () => {
  if (addwebBtn.dataset.edit === "true") {
    RunActionData(addwebBtn, "frmWebSite", "userBusinessAction/updateWebsite", [website_url, website_type], [{ name: 'idSearch', value: addwebBtn.dataset.editid }], true);

  }
  else
    SaveDataModal(addwebBtn, "frmWebSite", "userBusinessAction/addWebsite", [website_url, website_type]);
}

aboutBtn.onclick = () => {

  SaveDataModal(aboutBtn, "frmAbout", "userBusinessAction/editMyInfo", [], [], true);
}



btnve.onclick = () => {

  SaveDataModal(btnve, "frmLinks", "userAction/addLinks", [typeLink, Tag]);
}


const removeLinksItem = (e) => {
  let data = e.currentTarget.dataset;
  let idSearch = data.id;

  SwalRemoveFetch("userAction/removeUserLink", { idSearch }, GetAllData)
}

btnlang.onclick = () => {
  if (btnlang.dataset.edit === "true") {
    RunActionData(btnlang, "frmlang", "userBusinessAction/updateLanguage", [language, proficiency],
      [{ name: 'idSearch', value: btnlang.dataset.editid }], true);

  }
  else
    SaveDataModal(btnlang, "frmlang", "userBusinessAction/addLanguage", [language, proficiency]);
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

GetUserOnlineInfo().then((data) => {

  idOnline = data.data[0].id
  ShowUserInfo(data.data[0]);
})

GetAllData();
CreateSelectOption({ url: "fetchData/proof_get", params: { type: "userLink" } }, { id: "type_link", value: "id", title: "title" })
