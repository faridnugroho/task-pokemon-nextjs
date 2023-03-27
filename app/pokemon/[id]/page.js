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

async function getDetail(id) {
  let detailPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return detailPokemon.json();
}

export default function Pokemon({ params }) {
  const [newFetch, setNewfetch] = useState({});

  useEffect(() => {
    async function fetchData() {
      const detail = await getDetail(params.id);
      setNewfetch(detail);
    }
    fetchData();
  }, [params.id]);

  return (
    <Card sx={{ display: 'flex', minHeight: '100vh' }}>
      <CardContent>
        <TableContainer>
          <div style={{ overflowX: 'auto' }}>
            <Table
              sx={{
                border: '1px solid black',
                borderColor: 'grey.500',
                borderRadius: '5px',
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell>{newFetch?.species?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Weight</TableCell>
                  <TableCell>{newFetch?.weight}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Species</TableCell>
                  <TableCell>{newFetch?.species?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>
                    Base Experience
                  </TableCell>
                  <TableCell>{newFetch?.base_experience}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </CardContent>
      <CardContent>
        <img
          src={newFetch?.sprites?.other?.dream_world?.front_default}
          alt={newFetch?.name}
        />
      </CardContent>
    </Card>
  );
}
