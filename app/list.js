import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import Link from 'next/link';

export function Pokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  }, []);

  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const data = await Promise.all(
        pokemonList.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
            .catch((error) => console.error(error))
        )
      );
      setPokemonData(data);
    };
    fetchPokemonData();
  }, [pokemonList]);

  const handleNextClick = () => {
    fetch(nextUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  };

  const handlePrevClick = () => {
    fetch(prevUrl)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card sx={{ minWidth: '100%' }}>
      <CardContent>
        <TableContainer>
          <div style={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>NO.</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Height</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Species</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Sprites
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pokemonData.map((pokemon, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link href={`/pokemon/` + pokemon.id}>
                        {pokemon.name}
                      </Link>
                    </TableCell>
                    <TableCell>{pokemon.height}</TableCell>
                    <TableCell>{pokemon.weight}</TableCell>
                    <TableCell>{pokemon.species.name}</TableCell>
                    <TableCell>{pokemon.types[0].type.name}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </CardContent>
      <Stack
        direction="row"
        spacing={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <Button
          variant="contained"
          onClick={handlePrevClick}
          disabled={!prevUrl}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextClick}
          disabled={!nextUrl}
        >
          Next
        </Button>
      </Stack>
    </Card>
  );
}
