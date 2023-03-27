'use client';
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
import { useParams } from 'react-router-dom';

export function Pokemon() {
  const [newFetch, setNewFetch] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + id);
      const data = await response.json();
      setNewFetch(data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('data newFetch', newFetch);

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
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{newFetch.name}</TableCell>
                  <TableCell>{newFetch.height}</TableCell>
                  <TableCell>{newFetch.weight}</TableCell>
                  <TableCell>{newFetch.species.name}</TableCell>
                  <TableCell>{newFetch.types[0].type.name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <img
                      src={newFetch.sprites.front_default}
                      alt={newFetch.name}
                    />
                  </TableCell>
                </TableRow>
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
