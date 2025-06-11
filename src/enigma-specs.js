/** This file defines the specifications for each Enigma model. */

const ENIGMA_SPECS = {
    "Enigma I": {
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
    "NumRotors": 3, 
    "Keyboard": [
      ["Q","W","E","R","T","Z","U","I","O"],
      ["A","S","D","F","G","H","J","K"],
      ["P","Y","X","C","V","B","N","M","L"]
    ],
    "Rotors": [
      { "Name": "I",
        "Wiring": "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        "Turnover": ["Q"]
      },
      { "Name": "II",
        "Wiring": "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        "Turnover": ["E"]
      },
      { "Name": "III",
        "Wiring": "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        "Turnover": ["V"]
      },
      { "Name": "IV",
        "Wiring": "ESOVPZJAYQUIRHXLNFTGKDCMWB",
        "Turnover": ["J"]
      },
      { "Name": "V",
        "Wiring": "VZBRGITYUPSDNHLXAWMJQOFECK",
        "Turnover": ["Z"]
      }
    ],
    "Reflectors": [
      { "Name": "A",
        "Wiring": "EJMZALYXVBWFCRQUONTSPIKHGD"
      },
      { "Name": "B",
        "Wiring": "YRUHQSLDPXNGOKMIEBFZCWVJAT"
      },
      { "Name": "C",
        "Wiring": "FVPJIAOYEDRZXWGCTKUQSBNMHL"
      }
    ]
  }
}

export default ENIGMA_SPECS; 