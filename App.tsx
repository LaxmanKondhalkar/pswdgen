import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Password is too short - should be 4 chars minimum.')
    .max(16, 'Password is too long - should be 16 chars maximum.')
    .required('Password is required'),
});

/**
 * The main component of the password generator app.
 */
/**
 * The main component of the password generator application.
 * Renders the password generation form and handles password generation logic.
 */
const App = () => {
  // State variables
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  /**
   * Generates a password based on the selected options.
   * @param passwordLength - The length of the password to generate.
   */
  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const specialChars = '!@#$%^&*()_+';
    const numberChars = '0123456789';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += specialChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  /**
   * Creates a password using the given characters and length.
   * @param characters - The characters to choose from when generating the password.
   * @param passwordLength - The length of the password to generate.
   * @returns The generated password.
   */
  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  // JSX code
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              generatePassword(Number(values.passwordLength));
            }}
          >
            {({
              handleChange,
              handleReset,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                {/* Password Length input */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.inputLabel}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                    <TextInput
                      style={styles.inputStyle}
                      value={values.passwordLength}
                      placeholder="Password Length"
                      onChangeText={handleChange('passwordLength')}
                      keyboardType="numeric"
                      onBlur={handleBlur('passwordLength')}
                    />
                  </View>
                </View>

                {/* Lower Case checkbox */}
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    style={{ flex: 1 }}
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor="yellow"
                  />
                  <Text style={styles.checkboxText}>Lower Case</Text>
                </View>

                {/* Upper Case checkbox */}
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    style={{ flex: 1 }}
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="red"
                  />
                  <Text style={styles.checkboxText}>Upper Case</Text>
                </View>

                {/* Numbers checkbox */}
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    style={{ flex: 1 }}
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor="green"
                  />
                  <Text style={styles.checkboxText}>Numbers</Text>
                </View>

                {/* Symbols checkbox */}
                <View style={styles.inputWrapper}>
                  <BouncyCheckbox
                    style={{ flex: 1 }}
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="blue"
                  />
                  <Text style={styles.checkboxText}>Symbols</Text>
                </View>

                {/* Generate Password button */}
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                  <Text style={styles.buttonText}>Generate Password</Text>
                </TouchableOpacity>

                {/* Reset button */}
                <TouchableOpacity style={styles.button} onPress={() =>handleReset()}>
                  <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>

                {/* Generated Password */}
                {isPassGenerated && (
                  <View style={[styles.card, styles.cardElevated]}>
                    <Text style={styles.subTitle}>Generated Password:</Text>
                    <Text style={styles.description}>Long Press to Copy</Text>
                    <Text selectable style={styles.generatedPassword}>
                      {password}
                    </Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  generatedPassword: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
    color: '#333333',
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
  },
  cardElevated: {
    elevation: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  checkboxText: {
    fontSize: 16,
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },

  inputStyle: {
    color: '#ffffff',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    borderColor: '#3498db',
   
  },
  formContainer: {
    margin: 10,
  },
  appContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },

});