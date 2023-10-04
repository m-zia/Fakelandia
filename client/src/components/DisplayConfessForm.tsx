import { ConfessFormData } from "../types/confess.types";

const DisplayConfessForm: React.FC<{ form: ConfessFormData }> = ({ form }) => (
  <div>
    <div>
      Subject: <span>{form.subject}</span>
    </div>
    <div>
      Reason for contact: <span>{form.reason}</span>
    </div>
    <div>
      <span>{form.details}</span>
    </div>
  </div>
);

export default DisplayConfessForm;
