import { FC, useRef, useState } from 'react'
import { LANGUAGES, ZubaanLanguage } from '../utils/languages';

type LanguagePickerProps = {
  onChange: (lang: ZubaanLanguage) => void,
  label: string,
  defaultLang: ZubaanLanguage
}

const LanguagePicker: FC<LanguagePickerProps> = ({
  onChange,
  label,
  defaultLang
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<ZubaanLanguage>(defaultLang);
  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        {label}
        <input onClick={() => {
          dialogRef.current?.showModal();
        }} type="text" value={currentLanguage.name} placeholder="Type here" className="input w-full max-w-xs" />
      </label>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={dialogRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form className="modal-box">
          <h3 className="font-bold text-lg text-center">Pick a language</h3>
          <ul className="max-h-[300px] overflow-auto">
            {LANGUAGES.map((lang) => {
              return <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">{lang.name}</span>
                  <input checked={lang.code === currentLanguage.code} onChange={() => {
                    setCurrentLanguage(lang);
                  }} type="radio" name="language" className="radio checked:bg-red-500" value={lang.code} />
                </label>
              </div>
            })}
          </ul>
          <div className="modal-action">
            <button type="button" className="btn" onClick={() => {
              dialogRef.current!.close();
            }}>Close</button>
            <button onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              onChange(currentLanguage);
              dialogRef.current!.close();
            }} className="btn btn-base-100" type="submit">Save</button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default LanguagePicker;



