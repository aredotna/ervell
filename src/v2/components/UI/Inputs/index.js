import _Input from 'v2/components/UI/Inputs/components/Input'
import _LabelledInput from 'v2/components/UI/Inputs/components/LabelledInput'
import _Textarea from 'v2/components/UI/Inputs/components/Textarea'
import _Select from 'v2/components/UI/Inputs/components/Select'
import _Checkbox from 'v2/components/UI/Inputs/components/Checkbox'
import _ErrorMessage from 'v2/components/UI/Inputs/components/ErrorMessage'
import _TextInput from 'v2/components/UI/Inputs/components/TextInput'
import _Label from 'v2/components/UI/Inputs/components/Label'
import _LabelledCheckbox from 'v2/components/UI/Inputs/components/LabelledCheckbox'
import _mixin from 'v2/components/UI/Inputs/mixin'

export const Input = _Input
export const LabelledInput = _LabelledInput
export const Textarea = _Textarea
export const Select = _Select
export const Checkbox = _Checkbox
export const ErrorMessage = _ErrorMessage
export const TextInput = _TextInput
export const Label = _Label
export const LabelledCheckbox = _LabelledCheckbox
export const mixin = _mixin
export const inputVerticalPadding = x => `${x.theme.space[4]}`
export const inputHorizontalPadding = x => `${x.theme.space[5]}`
export const inputPadding = x => `${x.theme.space[4]} ${x.theme.space[5]}`
