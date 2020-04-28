import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePresenter from "./ProfilePresenter";
import { RootStateType } from "@Services/Store/modules";
import { profileSelectAction } from "@Services/Store/modules/Profile/actions";

export interface IProps
  extends RouteComponentProps<{ searchUserName: string }> {
  profile: RootStateType["profile"];
  profileSelectAction: typeof profileSelectAction;
}
const ProfileContainer = withRouter((props: IProps) => {
  const searchUserName = props.match.params.searchUserName;
  useEffect(() => {
    props.profileSelectAction(searchUserName);
  }, [props.match.params.searchUserName]);

  return <ProfilePresenter profile={props.profile} />;
});
export default connect(
  ({ profile, loading }: RootStateType) => ({
    profile,
    loadingAuth: loading["profile/PROFILE_SELECT_REQUEST"],
  }),
  { profileSelectAction }
)(ProfileContainer);
