import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Services from "../services";
import { useSnackbar } from "notistack";

function About_us() {
  const { enqueueSnackbar } = useSnackbar();
  const [about, setAbout] = useState("");

  useEffect(() => {
    getAboutUs();
  }, []);

  const getAboutUs = () => {
    // setLoading(true);
    Services.admin
      .getAboutUs()
      .then((response) => {
        const json = response.data;
        setAbout(
          new DOMParser().parseFromString(json, "text/html").documentElement
            .textContent
        );
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

  const updateAboutUs = () => {
    // setLoading(true);
    Services.admin
      .updateAboutUs(about)
      .then((response) => {
        const json = response.data;
        enqueueSnackbar("About Us Updated Successfully", {
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
  return (
    <section className=" pb-5">
      <div className="row pl-mdnav-cus mx-0">
        <div className="col-12">
          <div class="chat-header col-12">
            <h3 class="text-cus-primary pt-4 px-3">About Us</h3>
            <div class="mt-4 px-3">
              <CKEditor
                editor={ClassicEditor}
                data={about}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setAbout(data);
                }}
              />
            </div>
            <div class="btn-group-cus px-3 text-right">
              <button
                type="button"
                class="border-cus-success mr-3 font-700 text-cus-success bg-none bottom-btn-style"
              >
                Cancel
              </button>
              <button
                type="button"
                class="border-cus-success bottom-btn-style text-white font-700 bg-cus-success"
                onClick={() => {
                  if (!about) {
                    enqueueSnackbar("About Us can not be empty!", {
                      variant: "error",
                    });
                    return;
                  }
                  updateAboutUs();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About_us;
