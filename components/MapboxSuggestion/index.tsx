import { useCallback, useEffect, useState } from 'react';
import { config, SearchBox } from '@mapbox/search-js-react';
import { useFormContext } from 'react-hook-form';

interface MapboxSuggestionProps {
  name: string;
}
const MapboxSuggestion = ({ name }: MapboxSuggestionProps) => {
  const [token, setToken] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const { setValue } = useFormContext();
  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFullAddress(feature.properties.full_address);
      setValue(`${name}.address`, feature.properties.full_address);
      setValue(`${name}.coordinate.latitude`, feature.properties.coordinates.latitude);
      setValue(`${name}.coordinate.longitude`, feature.properties.coordinates.longitude);
    },
    [name, setValue],
  );
  const handleChange = (value: string) => {
    setValue(`${name}.address`, '');
    setValue(`${name}.coordinate.latitude`, 0);
    setValue(`${name}.coordinate.longitude`, 0);
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);
  return (
    <SearchBox
      className="input mb12"
      accessToken={token}
      onRetrieve={handleRetrieve}
      placeholder="Enter Location"
      value={fullAddress}
      onChange={handleChange}
      theme={{
        variables: {
          colorPrimary: '#212529',
          colorSecondary: '#424242',
          maxWidth: '300px',
          boxShadow: '0 0 0 0px silver',
          borderRadius: '0.5rem',
          border: '1px solid #d9d9d9',
          position: 'relative',
        },
        icons: { search: '', clear: '' },
        cssText: `
        .Input {
            background-color: none;
            padding-left: 10px;
          }
        .Input::placeholder {
          opacity: 0.5;
        }
        .Input:focus {
          border: 1px solid;
          border-color: #1677ff;
          box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
          outline: 0;
        }
        `,
      }}
    >
      <span className="absolute">ABC</span>
      {/* <input */}
      {/*   value={fullAddress} */}
      {/*   className="input mb12" */}
      {/*   placeholder="Start typing your address, e.g. 123 Main..." */}
      {/*   autoComplete="address-line1" */}
      {/*   id="mapbox-autofill" */}
      {/* /> */}
    </SearchBox>
  );
};
export default MapboxSuggestion;
