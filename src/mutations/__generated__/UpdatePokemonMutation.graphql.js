/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule UpdatePokemonMutation.graphql
 * @generated SignedSource<<0ec2d0d6f1b8bac9f0f9034353bc337e>>
 * @relayHash 2bb3ee4cc81ff1b0b5f07dbce1501a44
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type UpdatePokemonInput = {
  id?: ?string;
  name?: ?string;
  url?: ?string;
};

export type UpdatePokemonMutationResponse = {
  pokemon?: ?UpdatePokemonMutationResponse_pokemon;
};

export type UpdatePokemonMutationResponse_pokemon = {
  id: string;
  name?: ?string;
  url?: ?string;
};
*/


/*
mutation UpdatePokemonMutation(
  $input: UpdatePokemonInput!
) {
  updatePokemon(input: $input) {
    pokemon {
      id
      name
      url
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdatePokemonInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UpdatePokemonMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdatePokemonInput!"
          }
        ],
        "concreteType": "UpdatePokemonPayload",
        "name": "updatePokemon",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Pokemon",
            "name": "pokemon",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "url",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "UpdatePokemonMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "UpdatePokemonInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "UpdatePokemonMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "UpdatePokemonInput!"
          }
        ],
        "concreteType": "UpdatePokemonPayload",
        "name": "updatePokemon",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Pokemon",
            "name": "pokemon",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "url",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation UpdatePokemonMutation(\n  $input: UpdatePokemonInput!\n) {\n  updatePokemon(input: $input) {\n    pokemon {\n      id\n      name\n      url\n    }\n  }\n}\n"
};

module.exports = batch;
