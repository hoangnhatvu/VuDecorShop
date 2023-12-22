import { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@roketid/windmill-react-ui";
import Layout from "app/containers/Layout";

interface IModal {
  children: React.ReactNode;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

function Modals({ children, isModalOpen, onCloseModal }: IModal) {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalHeader>Modal header</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <div className="hidden sm:block">
          <Button layout="outline" onClick={onCloseModal}>
            Cancel
          </Button>
        </div>
        <div className="hidden sm:block">
          <Button>Accept</Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large" layout="outline" onClick={onCloseModal}>
            Cancel
          </Button>
        </div>
        <div className="block w-full sm:hidden">
          <Button block size="large">
            Accept
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default Modals;
