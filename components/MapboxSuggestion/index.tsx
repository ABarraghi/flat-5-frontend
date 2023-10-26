import { useCallback, useEffect, useState } from 'react';
import { config, SearchBox } from '@mapbox/search-js-react';
import { useFormContext } from 'react-hook-form';

interface MapboxSuggestionProps {
  name: string;
}
const MapboxSuggestion = ({ name }: MapboxSuggestionProps) => {
  const { setValue } = useFormContext();
  const [token, setToken] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const handleRetrieve = useCallback(
    (res: any) => {
      const feature = res.features[0];
      const address = feature.properties?.full_address || feature.properties?.place_formatted;
      setFullAddress(address);
      setValue(`${name}.address`, address);
      setValue(`${name}.coordinate.latitude`, feature.properties?.coordinates.latitude);
      setValue(`${name}.coordinate.longitude`, feature.properties?.coordinates.longitude);
    },
    [name, setValue],
  );
  const handleChange = (value: string) => {
    setValue(`${name}.address`, '');
    setValue(`${name}.coordinate.latitude`, 0);
    setValue(`${name}.coordinate.longitude`, 0);
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);
  return (
    <div className="w-full">
      {/* @ts-expect-error Server Component */}
      <SearchBox
        accessToken={token}
        onRetrieve={handleRetrieve}
        placeholder="Enter Location"
        value={fullAddress}
        onChange={handleChange}
        theme={{
          variables: {
            colorPrimary: '#212529',
            colorSecondary: '#424242',
            boxShadow: '0 0 0 0px silver',
            borderRadius: '0.5rem',
            border: '1px solid #d9d9d9',
          },
          icons: { search: '' },
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
      />
    </div>
  );
};
export default MapboxSuggestion;
