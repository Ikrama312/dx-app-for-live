import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Services from "../services";
import shortId from "shortid";
import { useSnackbar } from "notistack";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { Button } from "@material-ui/core";

function Faq() {
  const { enqueueSnackbar } = useSnackbar();
  const [faqs, setFaqs] = useState([
    { id: shortId.generate(), question: "", answer: "", saved: false },
  ]);
  const [modal, setModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getFAQs();
  }, []);

  const getFAQs = () => {
    // setLoading(true);
    Services.admin
      .getFaqs()
      .then((response) => {
        const json = [];
        response.data.forEach((item) =>
          json.push({
            ...item,
            question: new DOMParser().parseFromString(
              item.question,
              "text/html"
            ).documentElement.textContent,
            answer: new DOMParser().parseFromString(item.answer, "text/html")
              .documentElement.textContent,
            saved: true,
          })
        );
        setFaqs([...json, ...faqs]);
        // setLoading(false);
        // setData(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const createFAQs = (body) => {
    const { id, question, answer } = body;
    // setLoading(true);
    Services.admin
      .createFaq({ question, answer })
      .then((response) => {
        const json = response.data;
        const index = faqs.findIndex((item) => item.id === id);
        const updatedArray = [...faqs];
        updatedArray[index] = { ...json, saved: true };
        setFaqs(updatedArray);
        enqueueSnackbar("FAQ Created Successfully", {
          variant: "success",
        });

        // setLoading(false);
        // setData(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const updateFAQs = (body) => {
    const { id, question, answer } = body;
    // setLoading(true);
    Services.admin
      .updateFaq({ id, question, answer })
      .then((response) => {
        const json = response.data;

        enqueueSnackbar("FAQ Updated Successfully", {
          variant: "success",
        });
        // setLoading(false);
        // setData(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const deleteFAQ = (id) => {
    setDeleting(true);
    Services.admin
      .deleteFaq(id)
      .then((response) => {
        const json = response.data;

        enqueueSnackbar("FAQ Deleted Successfully", {
          variant: "success",
        });
        setDeleting(false);
        setFaqs(faqs.filter((faq) => faq.id !== id));
        confirmDeleteModalToggle();
        // setData(json);
      })
      .catch((error) => {
        const { response } = error;
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  onsubmit = (body) => {
    if (!body.question || !body.answer) {
      return;
    }
    console.log(body);
    !body.saved ? createFAQs(body) : updateFAQs(body);
  };

  const confirmDeleteModalToggle = (id) => {
    if (!deleting) {
      setModal(!modal);
      setDeleteId(id);
    }
  };

  return (
    <section className=" pb-5">
      <div>
        <div className="mt-3 mx-5 px-5 w-75 text-right">
          <button
            type="button"
            onClick={() => {
              const array = [...faqs];
              array.push({ id: shortId.generate(), question: "", answer: "" });
              setFaqs(array);
            }}
            className="border-cus-success mt-2 bottom-btn-style text-white font-700 bg-cus-success"
          >
            Add
          </button>
        </div>
        {faqs.map((faq, index) => (
          <div className="row pl-mdnav-cus mx-0" key={faq.id}>
            <div className="col-12">
              <div className="mt-4 px-3 col-sm-9">
                <label for="question" className="text-cus-primary font-700">
                  Question:
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={faq.question}
                  onChange={(event, editor) => {
                    const data = editor.getData();

                    const updatedArray = [...faqs];
                    updatedArray[index] = {
                      ...updatedArray[index],
                      question: data,
                    };
                    setFaqs(updatedArray);
                  }}
                />
              </div>
              <div className="row w-100 mx-0 align-items-end">
                <div className="mt-4 px-3 col-sm-9">
                  <label for="answer" className="text-cus-primary font-700">
                    Answer:
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={faq.answer}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      const updatedArray = [...faqs];
                      updatedArray[index] = {
                        ...updatedArray[index],
                        answer: data,
                      };
                      setFaqs(updatedArray);
                    }}
                  />
                </div>
                <div className="btn-group-cus px-3  col-sm-3 d-flex flex-column">
                  <button
                    type="button"
                    onClick={() => {
                      const array = faqs.filter((item) => item.id !== faq.id);
                      array.length && !faq.saved
                        ? setFaqs(array)
                        : faq.saved && confirmDeleteModalToggle(faq.id);
                    }}
                    className="border-cus-success mt-2 font-700 text-cus-success bg-none bottom-btn-style"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onsubmit({ ...faq });
                    }}
                    className="border-cus-success mt-2 bottom-btn-style text-white font-700 bg-cus-success"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modal}
        toggle={confirmDeleteModalToggle}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={confirmDeleteModalToggle}>Delete FAQ</ModalHeader>
        <ModalBody>Are You Sure You Want To Delete This FAQ?</ModalBody>
        <ModalFooter>
          {deleting ? (
            <Button
              color="default"
              variant="contained"
              className="rounded-pill"
              disabled
            >
              Deleting... <Spinner size="sm" color="primary" />
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              className="rounded-pill"
              disabled={deleting}
              onClick={() => deleteFAQ(deleteId)}
            >
              Yes
            </Button>
          )}
          <Button
            variant="contained"
            className="rounded-pill"
            color="default"
            onClick={confirmDeleteModalToggle}
            disabled={deleting}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}
export default Faq;
