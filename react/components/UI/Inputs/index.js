import _Input from 'react/components/UI/Inputs/components/Input';
import _Textarea from 'react/components/UI/Inputs/components/Textarea';
import _Select from 'react/components/UI/Inputs/components/Select';
import _Checkbox from 'react/components/UI/Inputs/components/Checkbox';
import _ErrorMessage from 'react/components/UI/Inputs/components/ErrorMessage';
import _TextInput from 'react/components/UI/Inputs/components/TextInput';
import _Label from 'react/components/UI/Inputs/components/Label';
import _mixin from 'react/components/UI/Inputs/mixin';

export const Input = _Input;
export const Textarea = _Textarea;
export const Select = _Select;
export const Checkbox = _Checkbox;
export const ErrorMessage = _ErrorMessage;
export const TextInput = _TextInput;
export const Label = _Label;
export const mixin = _mixin;
export const inputPadding = x => `${x.theme.space[5]} ${x.theme.space[6]}`;
