import React, { useEffect, useRef, useState } from "react";
import styles from "./CateringPage.module.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import axios from "axios";
import getHeaders from "../../helpers/getReqHeaders";
import Loader from "../../Components/Loader";

export default function ManageCateringPage() {
  const [tnc, setTnc] = useState([]);
  const [newTerm, setNewTerm] = useState("");
  const [termToUpdate, setTermToUpdate] = useState("");
  const [loading, setLoading] = useState(false);


  const fetchTnc = async () => {
    const res = await axios.get(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/view/tnc"
    );
    if (res.status !== 200) throw new Error("Error While Fetching Terms");
    console.log(res.data);
    setTnc(res.data);
  };

  const newTermAddHandler = async () => {
    setLoading(true)
    if (!newTerm) return toast.error("Enter term first!");
    const res = await axios.post(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/tnc",
      { condition: newTerm },
      {
        headers: getHeaders(),
      }
    );
    if (!res.data.success) {
      setLoading(false)
      return toast.error("Error Adding Terms Condition");
    } 
    setLoading(false)
    toast.success("Terms added successfully");
    fetchTnc();
    setNewTerm("");
  };

  const handleTermUpdate = (id) => {
    setTermToUpdate(id);
  };

  const updateTermsCondition = async (id, val) => {
    console.log(id, val);
    setLoading(true)
    if (!val) toast.error("Enter some condition first");
    const res = await axios.put(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/tnc",
      { id, condition: val },
      {
        headers: getHeaders(),
      }
    );
    if (!res.data.success) {
      setLoading(false)
      return toast.error("Error Updating Terms Condition");
    }
    toast.success("Terms updated successfully");
    setLoading(false)
    setTnc((item) => {
      if (item.id === id) {
        return {
          ...item,
          condition: val,
        };
      }
      return item;
    });
  };

  const deleteTncHandler = async (id) => {
    console.log(id);
    setLoading(true)
    const res = await axios.delete(
      "https://admin-panel-hadramaut-react-f4r8.vercel.app/delete/tnc",
      {
        data: { id },
        headers: getHeaders(),
      }
    );
    if (res.status !== 200){
      setLoading(false)
      return toast.error("Error in deleting Term!");
    } 
    toast.success("Successfully deleted term");
    setLoading(false)
    setTnc((prevData) => prevData.filter((data) => data.id !== id));
  };

  useEffect(() => {
    fetchTnc();
  }, []);

  if (Object.keys(tnc).length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.CateringContainer}>
      <h4>Manage Catering Page</h4>
      <div className={styles.uploadContainer}>
        <div>
          <label htmlFor="TermConditions">Terms & Conditions</label>
          <div className={styles.Add_form}>
            <input
              type="text"
              id="TermConditions"
              placeholder="Terms & Conditions"
              value={newTerm}
              onChange={(e) => setNewTerm(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={newTermAddHandler}
              disabled={loading}
            >
              ADD
            </Button>
          </div>
        </div>
        <div>
          <div className={styles.Terms_Cards}>
            {tnc &&
              tnc.map((terms) => (
                <TermsAndCondition
                  terms={terms}
                  key={terms.id}
                  termToUpdate={termToUpdate}
                  setTermToUpdate={setTermToUpdate}
                  handleTermUpdate={handleTermUpdate}
                  updateTermsCondition={updateTermsCondition}
                  deleteTncHandler={deleteTncHandler}
                />
              ))}
          </div>
        </div>
        <div>
          <form action="">
            <label htmlFor="callToAction">Call to action button</label>
            <div className={styles.Add_form}>
              <input
                type="text"
                id="callToAction"
                placeholder="call to action"
              />
              <Button  variant="contained"  disabled={loading} color="primary">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function TermsAndCondition({
  terms,
  handleTermUpdate,
  termToUpdate,
  setTermToUpdate,
  updateTermsCondition,
  deleteTncHandler,
  disabled
}) {
  const [updatedterm, setUpdatedTerm] = useState(terms.condition);

  const noUpdated = terms.condition == updatedterm;

  return (
    <div className={styles.Card}>
      {termToUpdate == terms.id ? (
        <input
          value={updatedterm}
          onBlur={(e) => {
            if (!noUpdated) {
              updateTermsCondition(terms.id, e.target.value);
            }
            setTermToUpdate("");
          }}
          onChange={(e) => setUpdatedTerm(e.target.value)}
        />
      ) : (
        <h4>{updatedterm}</h4>
      )}
      <div>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={() => deleteTncHandler(terms.id)}
          disabled={disabled}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="Edit"
          color="primary"
          disabled={disabled}
          onClick={() => {
            handleTermUpdate(terms.id);
          }}
        >
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}
