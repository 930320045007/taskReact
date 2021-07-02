import FormBase from "./form-base";
import {
  getSession,
  extractSession,
  verifySession,
  signout
} from "./../services/sessionService";

class PrivateFormPage extends FormBase {
  logout = () => {
    signout();
    this.props.history.push("/");
  };

  verifyAccess = () => {
    verifySession(this.state.sessionData.username, this.state.session)
      .then(data => {
        console.log("valid access");
      })
      .catch(err => {
        console.log("invalid access, redirecting...");
        this.props.history.replace("/login");
      });
  };

  constructor(props) {
    super(props);
    const session = getSession() || false;

    if (session) {
      const sessionData = extractSession(session);
      this.verifySession = verifySession;
      this.state = {
        ...this.state,
        session,
        sessionData
      };
    } else {
      if (this.props && this.props.history) {
        this.props.history.replace("/login");
      } else {
        //do nothing
      }
    }
  }
}

export default PrivateFormPage;
