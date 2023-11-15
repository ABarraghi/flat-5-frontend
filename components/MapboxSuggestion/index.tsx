import React, { useCallback, useEffect, useState } from 'react';
import { config, SearchBox } from '@mapbox/search-js-react';
import { useFormContext, Controller } from 'react-hook-form';
import { EnvironmentFilled } from '@ant-design/icons';
import { type BaseField } from '@/components/common/Form/Types/type';
import CustomErrorMessage from '@/components/common/CustomErrorMessage';

type MapboxSuggestionProps = {
  name: string;
} & BaseField;
const MapboxSuggestion = ({ name, rules, error }: MapboxSuggestionProps) => {
  const { setValue, getValues, control } = useFormContext();
  const [token, setToken] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const handleRetrieve = useCallback(
    (res: any) => {
      const feature = res.features[0];
      const address = feature.properties?.full_address || feature.properties?.place_formatted;
      const postCode = feature.properties?.context?.postCode?.name;
      const countryCode = feature.properties?.context?.country?.country_code_alpha_3 || '';
      const regionCode = feature.properties?.context?.region?.region_code || '';
      const place = feature.properties?.context?.place?.name || '';
      setFullAddress(address);
      setValue(`${name}.address`, address);
      setValue(`${name}.postCode`, postCode);
      setValue(`${name}.country`, countryCode);
      setValue(`${name}.state`, regionCode);
      setValue(`${name}.city`, place);
      setValue(`${name}.coordinate.latitude`, feature.properties?.coordinates.latitude);
      setValue(`${name}.coordinate.longitude`, feature.properties?.coordinates.longitude);
    },
    [name, setValue],
  );
  const handleChange = (value: string) => {
    setValue(`${name}.address`, '');
    setValue(`${name}.postCode`, '');
    setValue(`${name}.country`, '');
    setValue(`${name}.state`, '');
    setValue(`${name}.city`, '');
    setValue(`${name}.coordinate.latitude`, 0);
    setValue(`${name}.coordinate.longitude`, 0);
  };

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
    setToken(accessToken);
    config.accessToken = accessToken;
    const address = getValues(`${name}.address`);
    if (address) {
      setFullAddress(address);
    }
  }, [getValues, name]);
  return (
    <>
      <Controller
        name={`${name}.address`}
        control={control as any}
        rules={rules}
        render={({ field }) => {
          return (
            <div className="relative w-full">
              <>
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
            height: 50px;
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
                <EnvironmentFilled className="absolute bottom-0 right-1 top-0 z-10 mx-0 my-auto h-5 w-5 text-[#2E2F44] opacity-50" />
              </>
              {error && <CustomErrorMessage message={error} />}
            </div>
          );
        }}
      />
    </>
  );
};
export default MapboxSuggestion;
