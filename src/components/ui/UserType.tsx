import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../common/ui/select';

declare type UserType = 'creator' | 'editor' | 'viewer';
declare type UserTypeSelectorParams = {
  userType: string;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
  onClickHandler?: (value: string) => void;
};

const UserTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: UserTypeSelectorParams) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="w-24 rounded-r-lg border-0 hover:border-0  bg-white dark:bg-form-input">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="viewer">can view</SelectItem>
        <SelectItem value="editor">can edit</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserTypeSelector;
