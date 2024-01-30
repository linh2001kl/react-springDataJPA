import React, { Fragment, useCallback, useEffect, useState } from "react";
import Button from "@atlaskit/button/new";
import { Field, HelperMessage, Label } from "@atlaskit/form";
import Textfield from "@atlaskit/textfield";
import { makeStyles } from "@material-ui/styles";
import { DatePicker } from "@atlaskit/datetime-picker";

import Modal, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import UserService from "../data/UserService";

const useStyles = makeStyles({
  labelStyle: {
    "& label": {},
  },
});
const initValue = {
  name: "",
  cls: "",
  birthDay: "2020-12-15",
  email: "",
  address: "",
};
const UpdateModal = ({ isOpen, closeModal,handleUpdateData, editID }) => {
  console.log(editID);
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(initValue);

  const onSubmit = (e) => {
    e.preventDefault();
    let response = UserService.updateUser(editID,JSON.stringify(userInfo));
    response.then((res) => {
      handleUpdateData(res.data)
    });
    
    closeModal();
  };
  const onChangeInput = (e) => {
    if (e.target) {
      let key = e.target.id;
      let value = e.target.value;
      setUserInfo({ ...userInfo, [key]: value });
    } else {
      setUserInfo({ ...userInfo, birthDay: e });
    }
  };
  useEffect(() => {
    let response = UserService.getUserById(editID)
    response.then((res)=>{
      setUserInfo(res.data)
    });
  }, []);
  return (
    <ModalTransition>
      {isOpen && (
        <Modal onClose={closeModal}>
          <form onSubmit={onSubmit} className={classes.labelStyle}>
            <ModalHeader>
              <ModalTitle>Create User</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Field id="name" name="name" label="Enter user name :">
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      value={userInfo.name}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </Fragment>
                )}
              </Field>
              <Field id="cls" name="cls" label="Enter user class :">
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      value={userInfo.cls}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </Fragment>
                )}
              </Field>
              <div>
                <Label htmlFor="birthDay">Birth Day:</Label>
                <DatePicker
                  selectProps={{ inputId: "birthDay" }}
                  value={userInfo.birthDay}
                  onChange={(e) => onChangeInput(e)}
                />
              </div>
              <Field id="email" name="email" label="Enter user email :">
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      value={userInfo.email}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </Fragment>
                )}
              </Field>
              <Field id="address" name="address" label="Enter user address :">
                {({ fieldProps }) => (
                  <Fragment>
                    <Textfield
                      {...fieldProps}
                      value={userInfo.address}
                      onChange={(e) => onChangeInput(e)}
                    />
                  </Fragment>
                )}
              </Field>
            </ModalBody>
            <ModalFooter>
              <Button appearance="subtle" onClick={closeModal}>
                Close
              </Button>
              <Button appearance="primary" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </ModalTransition>
  );
};
export default UpdateModal;
