export const GetBlockUnBlock = (block, id) => {
  if (block === "0") {
    return (
      '<button data-id="' +
      id +
      '" class="btn btn-outline-danger btn-sm btn-radus  m-1 block">Block</button>'
    );
  } else {
    return (
      '<button data-id="' +
      id +
      '" class="btn btn-outline-info btn-sm btn-radus  m-1 unblock">Unblock</button>'
    );
  }
};

export const ChangeToUnBlock = (id) => {
  $("#div_" + id).html("");
  $("#div_" + id).html(
    '<button data-id="' +
      id +
      '" class="btn btn-outline-info btn-sm btn-radus  m-1 unblock">Unblock</button>'
  );
};

export const ChangeToBlock = (id) => {
    $("#div_" + id).html("");
    $("#div_" + id).html(
        '<button data-id="' +
        id +
        '" class="btn btn-outline-danger btn-sm btn-radus  m-1 block">Block</button>'
    );
  };