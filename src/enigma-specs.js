/** This file defines the specifications for each Enigma model. */

const ENIGMA_SPECS = {
  "Enigma I": {
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
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
    ],
    "Zusatzwalze": []
  },
  "Enigma M3": {
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
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
      },
      {
        "Name": "VI",
        "Wiring": "JPGVOUMFYQBENHZRDKASXLICTW",
        "Turnover": ["Z","M"]
      },
      {
        "Name": "VII",
        "Wiring": "NZJHGRCXMYSWBOUFAIVLPEKQDT",
        "Turnover": ["Z","M"]
      },
      {
        "Name": "VIII",
        "Wiring": "FKQHTLXOCBJSPDZRAMEWNIUYGV",
        "Turnover": ["Z","M"]
      },
    ],
    "Reflectors": [
      { "Name": "B",
        "Wiring": "YRUHQSLDPXNGOKMIEBFZCWVJAT"
      },
      { "Name": "C",
        "Wiring": "FVPJIAOYEDRZXWGCTKUQSBNMHL"
      }
    ],
    "Zusatzwalze": []
  },
  "Enigma M4": {
    "ETW": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
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
      },
      {
        "Name": "VI",
        "Wiring": "JPGVOUMFYQBENHZRDKASXLICTW",
        "Turnover": ["Z","M"]
      },
      {
        "Name": "VII",
        "Wiring": "NZJHGRCXMYSWBOUFAIVLPEKQDT",
        "Turnover": ["Z","M"]
      },
      {
        "Name": "VIII",
        "Wiring": "FKQHTLXOCBJSPDZRAMEWNIUYGV",
        "Turnover": ["Z","M"]
      },
    ],
    "Reflectors": [
      { "Name": "b",
        "Wiring": "ENKQAUYWJICOPBLMDXZVFTHRGS"
      },
      { "Name": "c",
        "Wiring": "RDOBJNTKVEHMLFCWZAXGYIPSUQ"
      }
    ],
    "Zusatzwalze": [
      { "Name": "β",
        "Wiring": "LEYJVCNIXWPBQMDRTAKZGFUHOS"
      },
      { "Name": "γ",
        "Wiring": "FSOKANUERHMBTIYCWLQPZXVGJD"
      }
    ]
  }
}

export default ENIGMA_SPECS; 