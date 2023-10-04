import { useState, useContext } from "react";
import {
  ConfessFormData,
  ConfessFormChangeHandler,
} from "../types/confess.types";
import {
  validateSubject,
  validateReason,
  validateDetails,
} from "./validation/validate_confess_form";
import DisplayConfessForm from "./DisplayConfessForm";
import { TextInput } from "./inputs/TextInput";
import { MisdemeanourContext } from "../context/MisdemeanourContext";
import { SelectInput } from "./inputs/SelectInput";
import { Misdemeanour, MisdemeanourKind } from "../types/misdemeanours.types";
import { useNavigate } from "react-router-dom";
import { useConfess } from "../hooks/useConfess";
import "../styles/confess.css";

const defaultFormData: ConfessFormData = {
  subject: "",
  reason: "",
  details: "",
};

const ConfessForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ConfessFormData>(defaultFormData);
  const [submitted, setSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string[];
  }>({});

  const onChangeHandler: ConfessFormChangeHandler = <
    TKey extends keyof ConfessFormData
  >(
    value: ConfessFormData[TKey],
    name: TKey
  ) => {
    setSubmitted(false);

    const newData: ConfessFormData = { ...formData };
    newData[name] = value;
    setFormData(newData);

    const newValidationErrors = { ...validationErrors };
    newValidationErrors[name] =
      name === "subject"
        ? validateSubject(value)
        : name === "reason"
        ? validateReason(value)
        : validateDetails(value);
    setValidationErrors(newValidationErrors);
  };

  const { addMisdemeanour } = useContext(MisdemeanourContext);

  const { confess, loading, error } = useConfess();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await confess(formData);

    if (data && data.success && !data.justTalked) {
      const newMisdemeanour: Misdemeanour = {
        citizenId: data.citizenId,
        misdemeanour: formData.reason as MisdemeanourKind,
        date: new Date().toLocaleDateString(),
      };

      addMisdemeanour(newMisdemeanour);
      navigate("/misdemeanours");
    } else {
      alert(data.message);
    }
  };

  const isFormValid = () => {
    const errors = [
      ...validateSubject(formData.subject),
      ...validateReason(formData.reason),
      ...validateDetails(formData.details),
    ];

    return (
      errors.length === 0 &&
      formData.subject &&
      formData.reason &&
      formData.details
    );
  };

  return (
    <>
      <section className="confess">
        <div className="confess__description">
          <p>
            It's very difficult to catch people committing misdemeanours so we
            appreciate it when citizens confess to us directly.
          </p>
          <p>
            However, if you're just having a hard day and need to vent then
            you're welcome to contact us here too. Up to you!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="confess__form"
          aria-label="Confession form"
        >
          <fieldset className="confess__fieldset">
            <TextInput
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Enter a subject"
              label="Subject"
              validate={validateSubject}
              onChangeHandler={onChangeHandler}
            />
            <hr />
            <SelectInput
              id="reason"
              name="reason"
              value={formData.reason ?? ""}
              label="Reason for contact"
              validate={validateReason}
              onChangeHandler={onChangeHandler}
              options={[
                { value: "NOT_SELECTED", display: "-" },
                { value: "just-talk", display: "📢 I just want to talk" },
                { value: "rudeness", display: "🤪 Mild Public Rudeness" },
                { value: "lift", display: "🗣 Speaking in a Lift" },
                {
                  value: "vegetables",
                  display: "🥗 Not Eating Your Vegetables",
                },
                { value: "united", display: "😈 Supporting Manchester United" },
              ]}
            />
            <TextInput
              id="details"
              type="textarea"
              name="details"
              value={formData.details}
              placeholder="Enter the details"
              label="Details"
              validate={validateDetails}
              onChangeHandler={onChangeHandler}
            />
          </fieldset>
          <button
            type="submit"
            className="confess__button"
            disabled={loading || !isFormValid()}
          >
            Confess
          </button>
        </form>
        {loading && <div className="confess__loading">Loading...</div>}
        {error && <div className="confess__error">Error: {error}</div>}
        {submitted && <DisplayConfessForm form={formData} />}
      </section>
    </>
  );
};

export default ConfessForm;
