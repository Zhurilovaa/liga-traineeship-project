import React from 'react';
import { TaskButtonProps } from 'src/app/TasksList/components/Task/components/TaskButton/TaskButton.types';

import 'src/app/TasksList/components/Task/components/TaskButton/TaskButton.css';

export function TaskButton({ typeOfButtonProp, disabled = false }: TaskButtonProps) {
  return (
    <div>
      {typeOfButtonProp === 'edit' ? (
        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-button">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              opacity="0.1"
              d="M18.556 8.90942L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L15.0647 5.35974C15.0742 5.4062 15.0969 5.45049 15.1329 5.48653L18.5506 8.90426C18.5524 8.90601 18.5542 8.90773 18.556 8.90942Z"></path>
            <path
              d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
            <path
              d="M15.3096 5.30981L18.7273 8.72755"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </g>
        </svg>
      ) : typeOfButtonProp === 'delete' ? (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-button delete-btn">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"></path>
          </g>
        </svg>
      ) : typeOfButtonProp === 'important' || typeOfButtonProp === 'not important' ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            (disabled ? 'disabled ' : '') + (typeOfButtonProp === 'important' ? 'svg-button important' : 'svg-button')
          }>
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              opacity="0.1"
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"></path>
            <path
              d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              strokeWidth="1.5"></path>
            <path d="M12 8L12 13" strokeWidth="1.5" strokeLinecap="round"></path>
            <path d="M12 16V15.9888" strokeWidth="1.5" strokeLinecap="round"></path>
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 17.5 17.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={typeOfButtonProp === 'complete' ? 'svg-button complete' : 'svg-button'}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.20834 8.50017C1.20859 5.02152 3.6661 2.02747 7.07795 1.34905C10.4898 0.670623 13.9058 2.49678 15.2368 5.71072C16.5678 8.92465 15.4432 12.6313 12.5507 14.5637C9.6582 16.4962 5.80341 16.1163 3.34376 13.6564C1.97634 12.2889 1.2082 10.4341 1.20834 8.50017Z"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.85419 8.50015L7.2844 10.9304L12.1459 6.06995"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
